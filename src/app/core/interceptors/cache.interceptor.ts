import {
  HttpContextToken,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { of, tap } from 'rxjs';

export const WITH_CACHE_CONTEXT = new HttpContextToken<boolean>(() => false);
export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const isCacheEnabled = req.context.get(WITH_CACHE_CONTEXT) ?? false;
  const cacheService = inject(CacheService);
  if (isCacheEnabled) {
    const cachedResponse = cacheService.get(
      req.urlWithParams,
      req.method,
      req.headers,
    );
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && isCacheEnabled) {
        cacheService.set(
          req.urlWithParams,
          req.method,
          req.headers,
          event.clone(),
        );
      }
    }),
  );
};
