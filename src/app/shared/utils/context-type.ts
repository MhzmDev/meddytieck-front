import { Context } from '../interfaces/context';

export function contextType<T, K extends object = object>() {
  return undefined as unknown as Context<T, K>;
}
