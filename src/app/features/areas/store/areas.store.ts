import { updateState } from '@angular-architects/ngrx-toolkit';
import { computed, effect, inject, untracked } from '@angular/core';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { withTreeShakableDevTools } from '../../../shared/store/features/with-devtools.feature';
import { withMultipleRequestStatus } from '../../../shared/store/features/with-multiple-request-status';
import { withPagination } from '../../../shared/store/features/with-pagination.feature';
import {
  setError,
  setFulfilled,
  setPending,
} from '../../../shared/store/features/with-request-status.feature';
import { extractError } from '../../../shared/utils/extract-error';
import { tryCatchObservable } from '../../../shared/utils/try-catch-utils';
import {
  Area,
  CreateAreaPayload,
  GetAreasResponse,
  UpdateAreaPayload,
} from '../models/areas.model';
import { AreasService } from '../services/areas.service';

interface State {
  // Store the direct array response
  _areasArray: Area[] | null;
  // Maintain compatibility with pagination feature
  _areasResponse: {
    count: number;
    pageIndex: number;
    pageSize: number;
    data: Area[];
  } | null;
  area: Area | null;
  filter: any;
}

const state: State = {
  _areasArray: null,
  _areasResponse: null,
  area: null,
  filter: {},
};

export const AreasStore = signalStore(
  withState(state),
  withTreeShakableDevTools('areas'),
  withPagination('_areasResponse'),
  withMultipleRequestStatus(
    'areas',
    'createArea',
    'updateArea',
    'getArea',
    'deleteArea',
  ),
  withComputed((store) => ({
    // Use the direct array stored in _areasArray
    areas: computed(() => store._areasArray()),
  })),
  withMethods(
    (
      store,
      areasService = inject(AreasService),
      toastr = inject(ToastService),
    ) => ({
      async getAreas() {
        updateState(store, 'getAreas/start', setPending('areas'));
        
        try {
          const { res, error } = await tryCatchObservable(
            areasService.getAreas({
              pageSize: store.pageSize(),
              pageIndex: store.page(),
              ...store.filter(),
            }),
          );
          
          if (error || !res) {
            const { errorMessage } = extractError(error);
            updateState(
              store,
              'getAreas/error',
              setError(errorMessage, 'areas'),
            );
            toastr.error(
              errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
            );
            return;
          }
          
          const areasArray = Array.isArray(res) ? res : [];
          const paginatedResponse = {
            count: areasArray.length,
            pageIndex: store.page(),
            pageSize: store.pageSize(),
            data: areasArray
          };
          
          updateState(
            store,
            'getAreas/success',
            { 
              _areasArray: areasArray,
              _areasResponse: paginatedResponse 
            },
            setFulfilled('areas'),
          );
        } catch (err) {
        }
      },

      async getAreaById(id: number) {
        updateState(store, 'getArea/start', setPending('getArea'));
        const { res, error } = await tryCatchObservable(
          areasService.getAreaById(id),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(
            store,
            'getArea/error',
            setError(errorMessage, 'getArea'),
          );
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(store, 'getArea/success', setFulfilled('getArea'), {
          area: res,
        });
      },

      async addArea(data: CreateAreaPayload) {
        updateState(store, 'addArea/start', setPending('createArea'));
        const { res, error } = await tryCatchObservable(
          areasService.createArea(data),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(
            store,
            'addArea/error',
            setError(errorMessage, 'createArea'),
          );
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(
          store,
          'addArea/success',
          setFulfilled('createArea'),
        );
        toastr.success('TOASTR.AREA_ADDED_SUCCESSFULLY');
        await this.getAreas();
      },

      async updateArea(data: UpdateAreaPayload) {
        updateState(
          store,
          'updateArea/start',
          setPending('updateArea'),
        );
        const { res, error } = await tryCatchObservable(
          areasService.updateArea(data),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(
            store,
            'updateArea/error',
            setError(errorMessage, 'updateArea'),
          );
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(
          store,
          'updateArea/success',
          setFulfilled('updateArea'),
        );
        toastr.success('TOASTR.AREA_UPDATED_SUCCESSFULLY');
        await this.getAreas();
      },

      async deleteArea(id: number,rowVersion:number) {
        updateState(store, 'deleteArea/start', setPending('deleteArea'));
        const { error } = await tryCatchObservable(
          areasService.deleteArea(id,rowVersion),
        );
        if (error) {
          const { errorMessage } = extractError(error);
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          updateState(
            store,
            'deleteArea/error',
            setError(errorMessage, 'deleteArea'),
          );
          return;
        }
        updateState(store, 'deleteArea/success', setFulfilled('deleteArea'));
        toastr.success('TOASTR.AREA_DELETED_SUCCESSFULLY');
        await this.getAreas();
      },
    }),
  ),
  withMethods((store) => ({
    searchBy: rxMethod<any>(
      pipe(
        debounceTime(400),
        tap((filter) => updateState(store, 'searchBy', { filter })),
        switchMap(() => store.getAreas()),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      // Initial data fetch
      store.getAreas().then();

      // Only handle subsequent page changes
      effect(() => {
        // Only react to page changes after initial load
        const currentPage = store.page();
        
        // Skip the initial effect trigger
        if (currentPage > 1) {
          untracked(() => {
            store.getAreas().then();
          });
        }
      });
    },
  }),
);
