import { updateState } from '@angular-architects/ngrx-toolkit';
import { computed, effect, inject, untracked } from '@angular/core';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { withAreas } from '../../../shared/store/features/buisness/with-areas';
import { withDepartments } from '../../../shared/store/features/buisness/with-departments';
import { withSystemRoles } from '../../../shared/store/features/buisness/with-system-roles';
import { withTreeShakableDevTools } from '../../../shared/store/features/with-devtools.feature';
import { withFeatures } from '../../../shared/store/features/with-features';
import { withMultipleRequestStatus } from '../../../shared/store/features/with-multiple-request-status';
import { withPagination } from '../../../shared/store/features/with-pagination.feature';
import {
  setError,
  setFulfilled,
  setPending,
} from '../../../shared/store/features/with-request-status.feature';
import { extractError } from '../../../shared/utils/extract-error';
import { tryCatchObservable } from '../../../shared/utils/try-catch-utils';
import { EmployeesSearch } from '../models/employees-search.model';
import {
  CreateEmployeePayload,
  Employee,
  GetEmployeesResponse,
  UpdateEmployeePayload,
} from '../models/employees.model';
import { EmployeesService } from '../services/employees.service';

interface State {
  _employeesResponse: GetEmployeesResponse | null;
  employee: Employee | null;
  filter: EmployeesSearch;
}

const state: State = {
  _employeesResponse: null,
  employee: null,
  filter: {},
};
export const EmployeesStore = signalStore(
  withState(state),
  withTreeShakableDevTools('employees'),
  withPagination('_employeesResponse'),
  withFeatures(
    withMultipleRequestStatus(
      'employees',
      'createEmployee',
      'updateEmployee',
      'getEmployee',
      'deleteUser',
    ),
    withDepartments(),
    withAreas(),
    withSystemRoles(),
  ),
  withEntities<Employee>(),
  withComputed((store) => ({
    employees: computed(() => store.entities()),
  })),
  withMethods(
    (
      store,
      employeesService = inject(EmployeesService),
      toastr = inject(ToastService),
    ) => ({
      async getEmployees() {
        updateState(store, 'getEmployees/start', setPending('employees'));
        const { res, error } = await tryCatchObservable(
          employeesService.getEmployees({
            pageSize: store.pageSize(),
            pageIndex: store.page(),
            ...store.filter(),
          }),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(
            store,
            'getEmployees/error',
            setError(errorMessage, 'employees'),
          );
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(
          store,
          'getEmployees/success',
          { _employeesResponse: res },
          setFulfilled('employees'),
        );
      },
      async getEmployeeById(id: string) {
        updateState(store, 'getEmployee/start', setPending('getEmployee'));
        const { res, error } = await tryCatchObservable(
          employeesService.getUserById(id),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(
            store,
            'getEmployee/error',
            setError(errorMessage, 'getEmployee'),
          );
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(store, 'getEmployee/success', setFulfilled('getEmployee'), {
          employee: res,
        });
      },
      async addEmployee(data: CreateEmployeePayload) {
        updateState(store, 'addEmployee/start', setPending('createEmployee'));
        const { res, error } = await tryCatchObservable(
          employeesService.addEmployee(data),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(
            store,
            'addEmployee/error',
            setError(errorMessage, 'createEmployee'),
          );
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(
          store,
          'addEmployee/success',
          setFulfilled('createEmployee'),
        );
        toastr.success('TOASTR.EMPLOYEE_ADDED_SUCCESSFULLY');
        await this.getEmployees();
      },
      async updateEmployee(data: UpdateEmployeePayload) {
        updateState(
          store,
          'updateEmployee/start',
          setPending('updateEmployee'),
        );
        const { res, error } = await tryCatchObservable(
          employeesService.updateEmployee(data),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(
            store,
            'updateEmployee/error',
            setError(errorMessage, 'updateEmployee'),
          );
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(
          store,
          'updateEmployee/success',
          setFulfilled('updateEmployee'),
        );
        toastr.success('TOASTR.EMPLOYEE_UPDATED_SUCCESSFULLY');
        await this.getEmployees();
      },
      async activateUser(id: string) {
        const { error } = await tryCatchObservable(
          employeesService.activateUser(id),
        );
        if (error) {
          const { errorMessage } = extractError(error);
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        toastr.success('TOASTR.EMPLOYEE_ACTIVATED_SUCCESSFULLY');
        await this.getEmployees();
      },
      async deactivateUser(id: string) {
        const { error } = await tryCatchObservable(
          employeesService.deactivateUser(id),
        );
        if (error) {
          const { errorMessage } = extractError(error);
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        toastr.success('TOASTR.EMPLOYEE_DEACTIVATED_SUCCESSFULLY');
        await this.getEmployees();
      },
      async deleteUser(id: string) {
        updateState(store, 'deleteUser/start', setPending('deleteUser'));
        const { error } = await tryCatchObservable(
          employeesService.deleteUser(id),
        );
        if (error) {
          const { errorMessage } = extractError(error);
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          updateState(
            store,
            'deleteUser/error',
            setError(errorMessage, 'deleteUser'),
          );
          return;
        }
        updateState(store, 'deleteUser/success', setFulfilled('deleteUser'));
        toastr.success('TOASTR.EMPLOYEE_DELETED_SUCCESSFULLY');
        await this.getEmployees();
      },
    }),
  ),
  withMethods((store) => ({
    searchBy: rxMethod<EmployeesSearch>(
      pipe(
        debounceTime(400),
        tap((filter) => updateState(store, 'searchBy', { filter })),
        switchMap(() => store.getEmployees()),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.getEmployees().then();

      effect(() => {
        const employeesRes = store._employeesResponse();
        if (!employeesRes) return;
        untracked(() => {
          updateState(store, 'setEntities', setAllEntities(employeesRes.data));
        });
      });
      effect(() => {
        store.page();
        untracked(() => {
          store.getEmployees().then();
        });
      });
    },
  }),
);
