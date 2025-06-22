import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation/translation.service';

@Pipe({
  name: 'translatedName',
  standalone: true,
  pure: false,
})
export class TranslatedNamePipe implements PipeTransform {
  translationService = inject(TranslationService);

  transform<T extends string, K extends string>(
    _: null,
    nameEn: K,
    nameAr: K,
  ): K | T {
    return this.translationService.currentLang() === 'en' ? nameEn : nameAr;
  }
}
