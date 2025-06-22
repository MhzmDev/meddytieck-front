import { Lang } from '../../core/constants/language';

export function translatedName<T extends string>(
  lang: Lang,
  name: T,
): `${T}En` | `${T}Ar` {
  return lang === Lang.Arabic ? `${name}Ar` : `${name}En`;
}
