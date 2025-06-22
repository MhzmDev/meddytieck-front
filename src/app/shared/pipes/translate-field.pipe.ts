import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation/translation.service';
import { ExtractBaseKeys } from '../utils/type-utils';

@Pipe({
  name: 'translateField',
  standalone: true,
  pure: false,
})
export class TranslateFieldPipe implements PipeTransform {
  translationService = inject(TranslationService);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform<O extends Record<string, any>, K extends ExtractBaseKeys<O>>(
    object: O | null | undefined,
    name: K = 'name' as K,
  ): O[`${K}En`] | O[`${K}Ar`] | null {
    if (!object) return null;
    return this.translationService.currentLang() === 'en'
      ? (object[`${name}En`] ?? null)
      : (object[`${name}Ar`] ?? null);
  }
}
