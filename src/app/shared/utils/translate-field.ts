import { Lang } from '../../core/constants/language';
import { ExtractBaseKeys } from './type-utils';

export function translateField<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  O extends Record<string, any>,
  K extends ExtractBaseKeys<O>,
>(lang: Lang, obj: O, field: K): O[`${K}En`] | O[`${K}Ar`] {
  return lang === Lang.Arabic
    ? obj[`${field}Ar` as const]
    : obj[`${field}En` as const];
}
