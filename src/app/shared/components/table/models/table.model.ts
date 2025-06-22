export type TableColumns<T extends object, F extends keyof T = keyof T> = ((
  | {
      field: F;
    }
  | { templateName: string }
  | { computedValue?: (item: T) => string | number | undefined | null }
) & {
  header: string;
  width?: string;
})[];
