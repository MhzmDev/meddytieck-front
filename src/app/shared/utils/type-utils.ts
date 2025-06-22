export type RemoveUnderscore<T extends string> = T extends `_${infer Rest}`
  ? Rest
  : T;
export type AllNullableOrUndefined<T> = {
  [K in keyof T]: T[K] | null | undefined;
};
export type NonNullableObject<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type ExtractBaseKeys<T> = {
  [K in keyof T]: K extends `${infer Base}En` | `${infer Base}Ar`
    ? Base
    : never;
}[keyof T];
export type LabelKeys<T> = ExtractBaseKeys<T>;
