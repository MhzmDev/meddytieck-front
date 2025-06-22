import { updateState } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import {
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Quota } from '../../../services/buisness/quota/quota.model';
import { QuotaService } from '../../../services/buisness/quota/quota.service';
import { ToastService } from '../../../services/toast/toast.service';
import { extractError } from '../../../utils/extract-error';
import { tryCatchObservable } from '../../../utils/try-catch-utils';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '../with-request-status.feature';

interface State {
  quotas: Quota[];
}

const state: State = {
  quotas: [],
};

export function withQuota() {
  return signalStoreFeature(
    withState(state),
    withRequestStatus('quota'),
    withMethods(
      (
        store,
        quotaService = inject(QuotaService),
        toastr = inject(ToastService),
      ) => ({
        async getQuotas() {
          updateState(store, 'getQuotas/start', setPending('quota'));
          const { res, error } = await tryCatchObservable(
            quotaService.getAllQuotas(),
          );
          if (error || !res) {
            const { errorMessage } = extractError(error);
            updateState(
              store,
              'getQuotas/error',
              setError(errorMessage, 'quota'),
            );
            toastr.error(
              errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
            );
            return;
          }
          updateState(
            store,
            'getQuotas/success',
            { quotas: res },
            setFulfilled('quota'),
          );
        },
      }),
    ),
    withHooks({
      onInit: (store) => {
        store.getQuotas().then();
      },
    }),
  );
}
