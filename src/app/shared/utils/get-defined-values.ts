import { NonNullableObject } from './type-utils';

export function getDefinedValues<T extends object>(
  arr: T,
): Partial<Required<NonNullableObject<T>>> {
  return Object.fromEntries(
    Object.entries(arr).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  ) as Partial<Required<NonNullableObject<T>>>;
}

export function getDefinedWithNullableValues<T extends object>(
  arr: T,
): Partial<Required<NonNullableObject<T>>> {
  return Object.fromEntries(
    Object.entries(arr).filter(([, value]) => value !== undefined),
  ) as Partial<Required<NonNullableObject<T>>>;
}

export function getDefinedValuesWithoutEmptyString<T extends object>(
  arr: T,
): Partial<Required<NonNullableObject<T>>> {
  return Object.fromEntries(
    Object.entries(arr).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Partial<Required<NonNullableObject<T>>>;
}
