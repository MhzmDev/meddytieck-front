import {
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SystemRolesService } from '../../../services/buisness/system-roles/system-roles.service';
import { inject } from '@angular/core';
import { withMultipleRequestStatus } from '../with-multiple-request-status';
import { updateState } from '@angular-architects/ngrx-toolkit';
import {
  setError,
  setFulfilled,
  setPending,
} from '../with-request-status.feature';
import { tryCatchObservable } from '../../../utils/try-catch-utils';
import { ToastService } from '../../../services/toast/toast.service';
import { extractError } from '../../../utils/extract-error';
import {
  SystemRole,
  UpdateUserRolesPayload,
} from '../../../services/buisness/system-roles/system-roles.model';

interface State {
  roles: SystemRole[];
}

const state: State = {
  roles: [],
};

export function withSystemRoles() {
  return signalStoreFeature(
    withState(state),
    withMultipleRequestStatus('roles', 'updateUserRoles'),
    withMethods(
      (
        store,
        systemRolesService = inject(SystemRolesService),
        toastr = inject(ToastService),
      ) => ({
        async getSystemRoles() {
          updateState(store, 'getSystemRoles/start', setPending('roles'));
          const { res, error } = await tryCatchObservable(
            systemRolesService.getSystemRoles(),
          );
          if (error || !res) {
            const { errorMessage } = extractError(error);
            updateState(
              store,
              'getSystemRoles/error',
              setError(errorMessage, 'roles'),
            );
            toastr.error(
              errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
            );
            return;
          }
          updateState(
            store,
            'getSystemRoles/success',
            { roles: res },
            setFulfilled('roles'),
          );
        },
        async updateUserRoles(id: string, body: UpdateUserRolesPayload) {
          updateState(store, 'updateUserRoles/start', setPending('roles'));
          const { res, error } = await tryCatchObservable(
            systemRolesService.updateUserRoles(id, body),
          );
          if (error || !res) {
            const { errorMessage } = extractError(error);
            updateState(
              store,
              'updateUserRoles/error',
              setError(errorMessage, 'roles'),
            );
            toastr.error(
              errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
            );
            return;
          }
          updateState(store, 'updateUserRoles/success', setFulfilled('roles'));
        },
      }),
    ),
    withHooks({
      onInit: (store) => store.getSystemRoles(),
    }),
  );
}
