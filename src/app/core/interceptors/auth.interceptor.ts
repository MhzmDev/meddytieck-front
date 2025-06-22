import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../features/auth/store/auth.store';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

export const AUTH_TOKEN_CONTEXT = new HttpContextToken<string>(() => '');
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  let token: string | null = null;
  if (req.context.get(AUTH_TOKEN_CONTEXT) || authStore.token()) {
    token = `Bearer ${req.context.get(AUTH_TOKEN_CONTEXT) || authStore.token()}`;
  }
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
  return next(req).pipe(
    // handle 401 by logout and redirect to auth
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authStore.logout();
        router.navigate(['/auth']).then();
      }
      throw error;
    }),
  );
};
