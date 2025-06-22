export function colsQuery(...args: (string | string[])[]): string {
  // Flatten the arguments to handle both strings and arrays
  const flattenedArgs = args.flat();
  return flattenedArgs.join(',');
}
