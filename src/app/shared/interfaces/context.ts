export type Context<C, T extends object = object> = {
  [K in keyof T]: T[K];
} & {
  $implicit: C;
};
