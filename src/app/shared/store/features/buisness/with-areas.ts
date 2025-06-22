import {
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ActiveEnum,
  Area,
} from '../../../services/buisness/lookups/lookups.model';
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
  areas: Area[];
}

const state: State = {
  areas: [],
};

export function withAreas() {
  return signalStoreFeature(
    withState(state),
    withRequestStatus('area'),
    withMethods(
      (
        store,
        lookupService = inject(LookupsService),
        toastr = inject(ToastService),
      ) => ({
        async getAreas(active: ActiveEnum = ActiveEnum.All) {
          updateState(store, 'getAreas/start', setPending('area'));
          const { res, error } = await tryCatchObservable(
            lookupService.getAreas(active),
          );
          if (error || !res) {
            const { errorMessage } = extractError(error);
            updateState(
              store,
              'getAreas/error',
              setError(errorMessage, 'area'),
            );
            toastr.error(
              errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
            );
            return;
          }
          updateState(
            store,
            'getAreas/success',
            { areas: res },
            setFulfilled('area'),
          );
        },
      }),
    ),
    withHooks({
      onInit: (store) => {
        store.getAreas().then();
      },
    }),
  );
}
