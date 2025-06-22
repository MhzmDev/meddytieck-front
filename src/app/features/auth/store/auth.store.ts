import { updateState } from '@angular-architects/ngrx-toolkit';
import { computed, effect, inject, untracked } from '@angular/core';
import { Router } from '@angular/router';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Subscription, timer } from 'rxjs';
import { LocalStorageKeys } from '../../../core/services/local-storage/local-storage-keys-types.model';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { withTreeShakableDevTools } from '../../../shared/store/features/with-devtools.feature';
import { withMultipleRequestStatus } from '../../../shared/store/features/with-multiple-request-status';
import {
  setError,
  setFulfilled,
  setPending,
} from '../../../shared/store/features/with-request-status.feature';
import { extractError } from '../../../shared/utils/extract-error';
import { tryCatchObservable } from '../../../shared/utils/try-catch-utils';
import { AuthResponse, LoginBody } from '../services/auth.model';
import { AuthService } from '../services/auth.service';

interface State {
  auth: AuthResponse | null;
  _rescheduleSub: Subscription | null;
}

const state: State = {
  auth: null,
  _rescheduleSub: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withTreeShakableDevTools('auth'),
  withMultipleRequestStatus('login', 'auth'),
  withComputed((store) => ({
    token: computed(() => store.auth()?.token),
    refreshToken: computed(() => store.auth()?.refreshToken),
    tokenExpiration: computed(() => store.auth()?.expiresOn),
    isAuthenticated: computed(() => !!store.auth()),
  })),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageService),
      toastr = inject(ToastService),
      router = inject(Router),
    ) => ({
      async login(body: LoginBody) {
        updateState(store, 'login/start', setPending('login'));
        const { res, error } = await tryCatchObservable(
          authService.login(body),
        );
        if (error || !res) {
          const { errorMessage } = extractError(error);
          updateState(store, 'login/error', setError(errorMessage, 'login'));
          toastr.error(
            errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
          );
          return;
        }
        updateState(
          store,
          'login/success',
          { auth: res },
          setFulfilled('login'),
        );
        localStorageService.setItem(LocalStorageKeys.Auth, res);
      },

      // async verifyOtp(otp: string, phoneNo: string) {
      //   updateState(store, 'verifyOtp/start', setPending('auth'));

      //   const { res, error } = await tryCatchObservable(
      //     authService.verifyOtp(otp, phoneNo),
      //   );
      //   if (error || !res) {
      //     const { errorMessage } = extractError(error);
      //     updateState(store, 'verifyOtp/error', setError(errorMessage, 'auth'));
      //     toastr.error(
      //       errorMessage || 'TOASTR.AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN',
      //     );
      //     return;
      //   }
      //   updateState(
      //     store,
      //     'verifyOtp/success',
      //     { auth: res },
      //     setFulfilled('auth'),
      //   );
      //   localStorageService.setItem(LocalStorageKeys.Auth, res);
      // },
      logout() {
        localStorageService.removeItem(LocalStorageKeys.Auth);
        updateState(store, 'logout', { auth: null });
        router.navigate(['/auth']).then();
      },
    }),
  ),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      localStorageService = inject(LocalStorageService),
    ) => ({
      async refreshToken() {
        const refreshToken = store.refreshToken();
        if (!refreshToken) return;
        const { res, error } = await tryCatchObservable(
          authService.refreshToken(refreshToken),
        );
        if (!res || error) {
          store.logout();
          return;
        }
        updateState(store, 'refreshToken', ({ auth: oldAuth }) => ({
          auth: { ...(oldAuth as AuthResponse), ...res },
        }));
        localStorageService.setItem(
          LocalStorageKeys.Auth,
          store.auth() as AuthResponse,
        );
      },
    }),
  ),
  withMethods((store) => ({
    scheduleRefresh() {
      const expirationInMs = new Date(
        store.tokenExpiration() as string,
      ).getTime();
      const now = Date.now();
      const delay = expirationInMs - now - 100000; // 100 seconds before expiry
      if (delay <= 0) {
        store.logout();
        return;
      }

      store._rescheduleSub()?.unsubscribe();

      const refreshSub = timer(delay).subscribe(() => {
        store.refreshToken();
      });

      updateState(store, 'scheduleRefresh', { _rescheduleSub: refreshSub });
    },
  })),
  withHooks({
    onInit(store, localStorageService = inject(LocalStorageService)) {
      const auth = localStorageService.getItem(LocalStorageKeys.Auth);
      if (auth) {
        updateState(store, 'relogin', { auth });
      }
      effect(() => {
        const storeAuth = store.auth();
        if (!storeAuth) return;
        untracked(() => {
          store.scheduleRefresh();
        });
      });
    },
  }),
);
