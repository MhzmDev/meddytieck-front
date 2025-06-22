import { DOCUMENT } from '@angular/common';
import {
  inject,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Lang } from '../../../core/constants/language';
import { LocalStorageKeys } from '../../../core/services/local-storage/local-storage-keys-types.model';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService implements OnDestroy {
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  private readonly _currentLang = signal<Lang>(Lang.Arabic);
  private renderer?: Renderer2;
  private readonly _isArabic = signal(false);

  public readonly isArabic = this._isArabic.asReadonly();
  public readonly currentLang = this._currentLang.asReadonly();
  private readonly document = inject(DOCUMENT);
  private destroy$ = new Subject<void>(); // Subject to manage subscriptions

  constructor(
    private translate: TranslateService,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.init();
    this.translate.use(Lang.Arabic);
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit signal to unsubscribe
    this.destroy$.complete(); // Complete the subject
  }

  /**
   * Initializes the application by checking the current user language setting
   *  in local storage. If no language setting is found, sets the language to the
   *  default language specified in the AppConfig. Then, adjusts the application
   *  based on the selected language.
   */

  init(): void {
    const storedLang = this.localStorageService.getItem(
      LocalStorageKeys.UserLang,
    );

    if (storedLang) {
      // Use stored language
      this._currentLang.set(storedLang as Lang);
      this.localStorageService.setItem(LocalStorageKeys.UserLang, storedLang);
    } else {
      // Default to Arabic if no language is found in storage
      this._currentLang.set(Lang.English);
      this.localStorageService.setItem(LocalStorageKeys.UserLang, Lang.English);
    }
    this.adjustApp();
  }

  /**
   * Changes the user language setting by reloading the page, setting the new
   *  language, updating the language setting in local storage, and adjusting the
   *  application based on the selected language.
   */

  toggleLang(): void {
    this._currentLang.update((lang) =>
      lang === Lang.English ? Lang.Arabic : Lang.English,
    );
    this.localStorageService.setItem(
      LocalStorageKeys.UserLang,
      this.currentLang(),
    );
    this.translate.use(this.currentLang());
    this.adjustApp();
    this.adjustFonts();
  }

  /**
   * Adjusts the application based on the selected language by updating the
   * translation service with the new language, adding or removing the 'rtl'
   * class to the body element for right-to-left language support, and updating
   *  the isArabic BehaviorSubject to reflect the selected language.
   */

  adjustApp(): void {
    const currentLang = this.currentLang();

    this.translate.use(currentLang);

    if (currentLang === Lang.Arabic) {
      this.renderer?.setAttribute(this.document.documentElement, 'dir', 'rtl');
      this.renderer?.setAttribute(this.document.documentElement, 'lang', 'ar');

      this._isArabic.set(true);
    } else {
      this.renderer?.setAttribute(this.document.documentElement, 'dir', 'ltr');
      this.renderer?.setAttribute(this.document.documentElement, 'lang', 'en');

      this._isArabic.set(false);
    }
  }

  adjustFonts(): void {
    const root = this.document.querySelector(':root') as HTMLElement;
    const rootStyle = getComputedStyle(root);

    const fontTitleEn = rootStyle.getPropertyValue('--font-title-en');
    const fontTitleAr = rootStyle.getPropertyValue('--font-title-ar');

    const fontBodyEn = rootStyle.getPropertyValue('--font-body-en');
    const fontBodyAr = rootStyle.getPropertyValue('--font-body-ar');

    if (this.currentLang() === Lang.Arabic) {
      root.style.setProperty('--font-title', fontTitleAr);
      root.style.setProperty('--font-body', fontBodyAr);
    } else {
      root.style.setProperty('--font-title', fontTitleEn);
      root.style.setProperty('--font-body', fontBodyEn);
    }
  }

  /**
   * Retrieves a translated value using the provided translation key.
   * @param value - The translation key for the desired value.
   * @returns The translated value corresponding to the given key.
   */

  translateValue(value: string): string {
    return this.translate.instant(value);
  }
}
