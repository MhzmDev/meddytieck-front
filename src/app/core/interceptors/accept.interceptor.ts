import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslationService } from '../../shared/services/translation/translation.service';

export const acceptInterceptor: HttpInterceptorFn = (req, next) => {
  const lang = inject(TranslationService).currentLang();
  req = req.clone({
    setHeaders: {
      Accept: 'application/json, text/plain, */*, version=2',
      'Accept-Language': lang,
    },
  });

  return next(req);
};
