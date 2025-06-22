// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNestedDotValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
