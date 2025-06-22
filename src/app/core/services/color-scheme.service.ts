import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly _colorScheme = signal<'dark' | 'light'>(
    // this.localStorageService.getItem(LocalStorageKeys.ColorScheme) ?? 'light',
    'light',
  );
  readonly isDark = computed(() => this._colorScheme() === 'dark');
  readonly colorScheme = this._colorScheme.asReadonly();

  constructor() {
    // if (!this.localStorageService.hasItem(LocalStorageKeys.ColorScheme)) {
    //   this.localStorageService.setItem(
    //     LocalStorageKeys.ColorScheme,
    //     this._colorScheme(),
    //   );
    // }
    effect(() => {
      const isDark = this.isDark();
      untracked(() => {
        if (isDark) {
          document.documentElement.classList.add('my-app-dark');
        } else {
          document.documentElement.classList.remove('my-app-dark');
        }
      });
    });
  }

  toggleColorScheme(): void {
    this.setColorScheme(this.isDark() ? 'light' : 'dark');
  }

  setColorScheme(colorScheme: 'dark' | 'light'): void {
    this._colorScheme.set(colorScheme);
    // this.localStorageService.setItem(
    //   LocalStorageKeys.ColorScheme,
    //   this._colorScheme(),
    // );
  }
}
