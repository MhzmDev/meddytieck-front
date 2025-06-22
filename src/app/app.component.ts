import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { Toast } from 'primeng/toast';
import { concatMap, filter, map, switchMap } from 'rxjs';
import { Lang } from './core/constants/language';
import { LocalStorageKeys } from './core/services/local-storage/local-storage-keys-types.model';
import { LocalStorageService } from './core/services/local-storage/local-storage.service';
import { TranslationService } from './shared/services/translation/translation.service';
import { getRouteLastChild } from './shared/utils/get-route-last-child';

@Component({
  selector: 'mtk-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private currentLang?: string;
  private readonly projectNameTranslationKey = 'MENU.PROJECT_NAME';

  localStorageService = inject(LocalStorageService);
  translationService = inject(TranslationService);
  titleService = inject(Title);
  translate = inject(TranslateService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  primeConfig = inject(PrimeNG);

  constructor() {
    this.translate.setDefaultLang(Lang.Arabic);
    this.primeConfig.ripple.set(true);
    this.currentLang =
      this.localStorageService.getItem(LocalStorageKeys.UserLang) ??
      Lang.Arabic;
    this.translate.use(this.currentLang);
    this.translate.setDefaultLang(this.currentLang);
    this.translationService.adjustFonts();

    this.setPageTitle();
    this.setPrimengTranslation();
  }
  setPrimengTranslation() {
    this.translate
      .stream('PRIMENG')
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        this.primeConfig.setTranslation(res);
      });
  }
  setPageTitle() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => this.activatedRoute.firstChild),
        filter((lastChild) => !!lastChild),
        map(() =>
          getRouteLastChild(this.activatedRoute.firstChild as ActivatedRoute),
        ),
        switchMap((route) => route.data),
        map((data) => data['pageTitle'] as string),
        concatMap((title) =>
          this.translate
            .get([this.projectNameTranslationKey, title])
            .pipe(map((translatedValue) => [translatedValue, title])),
        ),
        map(
          ([translatedValue, title]) =>
            `${translatedValue[this.projectNameTranslationKey]} | ${
              translatedValue[title]
            }`,
        ),
        takeUntilDestroyed(),
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }
}
