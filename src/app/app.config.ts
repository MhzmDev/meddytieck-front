import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  RouterModule,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import {
  HttpBackend,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { DialogService } from 'primeng/dynamicdialog';
import { PrimengPreset } from '../styles/primeng-preset/primeng-preset';
import { routes } from './app.routes';
import { TRANSLATION_FOLDERS } from './core/constants/translations-folders';
import { acceptInterceptor } from './core/interceptors/accept.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: PrimengPreset,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'base, primeng, primeng-custom-style',
          },
        },
      },
    }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      // withDebugTracing()
    ),
    provideHttpClient(
      withInterceptors([
        // internetInterceptor,
        cacheInterceptor,
        acceptInterceptor,
        authInterceptor,
      ]),
      withFetch(),
    ),
    provideAnimationsAsync(),
    RouterModule,
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
        defaultLanguage: 'ar',
        useDefaultLang: true,
      }),
    ]),
    DialogService,
    MessageService,
  ],
};

export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(httpBackend, TRANSLATION_FOLDERS);
}
