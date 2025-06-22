import {
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Department } from '../../../services/buisness/lookups/lookups.model';
import { inject } from '@angular/core';
import { LookupsService } from '../../../services/buisness/lookups/lookups.service';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../with-request-status.feature';
import { updateState } from '@angular-architects/ngrx-toolkit';
import { tryCatchObservable } from '../../../utils/try-catch-utils';
import { extractError } from '../../../utils/extract-error';
import { ToastService } from '../../../services/toast/toast.service';

interface State {
  departments: Department[];
}

const state: State = {
  departments: [],
};

export function withDepartments() {
  return signalStoreFeature(
    withState(state),
    withRequestStatus('department'),
    withMethods(
      (
        store,
        lookupService = inject(LookupsService),
        toastr = inject(ToastService),
      ) => ({
        async getDepartments() {
          updateState(store, 'getDepartments/start', setPending('department'));
          const { res, error } = await tryCatchObservable(
            lookupService.getDepartments(),
          );
          if (error || !res) {
            const { errorMessage } = extractError(error);
            updateState(
              store,
              'getDepartments/error',
              setError(errorMessage, 'department'),
            );
            toastr.error(
              errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
            );
            return;
          }
          updateState(
            store,
            'getDepartments/success',
            { departments: res },
            setFulfilled('department'),
          );
        },
      }),
    ),
    withHooks({
      onInit: (store) => {
        store.getDepartments().then();
      },
    }),
  );
}
