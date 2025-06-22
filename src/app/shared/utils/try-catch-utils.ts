import { lastValueFrom, Observable } from 'rxjs';

export function tryCatch<T>(fn: () => T) {
  try {
    return { res: fn(), error: null };
  } catch (error) {
    return { res: null, error };
  }
}

export async function tryCatchAsync<T>(promise: Promise<T>) {
  try {
    return { res: await promise, error: null };
  } catch (error) {
    return { res: null, error };
  }
}

export async function tryCatchObservable<T>(obs$: Observable<T>) {
  try {
    return { res: await lastValueFrom(obs$), error: null };
  } catch (error) {
    return { res: null, error };
  }
}
