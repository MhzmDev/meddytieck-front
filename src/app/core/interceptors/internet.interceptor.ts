import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, throwError, timeout } from 'rxjs';
import { ToastService } from '../../shared/services/toast/toast.service';

const REQUEST_TIMEOUT = 30000; // 30 seconds timeout
let slowRequestShown = false; // Prevent duplicate warnings

export const internetInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const toaster = inject(ToastService);
  if (!navigator.onLine) {
    handleNoInternet(router, toaster);
    return throwError(() => new HttpErrorResponse({ error: 'No internet' }));
  }

  const slowRequestWarning = setTimeout(() => {
    if (!slowRequestShown) {
      slowRequestShown = true;
      toaster.warn('⚠️ Internet is slow! The request is taking too long.');
    }
  }, 10000);
  return next(req).pipe(
    timeout(REQUEST_TIMEOUT),
    finalize(() => {
      clearTimeout(slowRequestWarning);
      slowRequestShown = false;
    }),
    catchError((error) => {
      clearTimeout(slowRequestWarning);
      slowRequestShown = false;
      if (!navigator.onLine) {
        handleNoInternet(router, toaster);
      }
      // else {
      //   toaster.error('❌ An error occurred! Please try again.');
      // }
      return throwError(() => error);
    }),
  );
};

function handleNoInternet(router: Router, toaster: ToastService) {
  toaster.error('❌ No internet connection! Redirecting...');
  const currentUrl = router.url;
  if (currentUrl !== '/internet-failed') {
    localStorage.setItem('lastVisitedUrl', currentUrl);
  }
  router.navigateByUrl('/internet-failed', { replaceUrl: false });
}
