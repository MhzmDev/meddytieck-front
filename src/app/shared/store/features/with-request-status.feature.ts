import { computed, Signal } from '@angular/core';
import {
  EmptyFeatureResult,
  Prettify,
  SignalStoreFeature,
  signalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';

export type RequestStatus =
  | 'idle'
  | 'pending'
  | 'fulfilled'
  | { error: Record<string, unknown> | null };

export type RequestStatusNamedState<T extends string> = Record<
  `${T}RequestStatus`,
  RequestStatus
>;
export type RequestStatusComputedState<T extends string> = {
  [K in T as `is${Capitalize<K>}Pending`]: Signal<boolean>;
} & {
  [K in T as `is${Capitalize<K>}Idle`]: Signal<boolean>;
} & {
  [K in T as `is${Capitalize<K>}Fulfilled`]: Signal<boolean>;
} & {
  [K in T as `${K}Error`]: Signal<string | null>;
};

export function withRequestStatus(): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: { requestStatus: RequestStatus };
    props: {
      isPending: Signal<boolean>;
      isFulfilled: Signal<boolean>;
      isIdle: Signal<boolean>;
      error: Signal<string | null>;
    };
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withRequestStatus<T extends string>(
  name: T,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: Prettify<RequestStatusNamedState<T>>;
    props: Prettify<RequestStatusComputedState<T>>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withRequestStatus(name?: string): SignalStoreFeature {
  const key = name ? `${name}RequestStatus` : 'requestStatus';
  return signalStoreFeature(
    withState({
      [key]: 'idle',
    }),
    withComputed((store: Record<string, Signal<unknown>>) => ({
      [name
        ? `is${name[0].toUpperCase() + name.slice(1)}Pending`
        : 'isPending']: computed(() => {
        return store[key]() === 'pending';
      }),
      [name
        ? `is${name[0].toUpperCase() + name.slice(1)}Fulfilled`
        : 'isFulfilled']: computed(() => store[key]() === 'fulfilled'),
      [name ? `is${name[0].toUpperCase() + name.slice(1)}Idle` : 'isIdle']:
        computed(() => store[key]() === 'idle'),
      [name ? `${name}Error` : 'error']: computed(() => {
        const status = store[key]() as RequestStatus;
        return typeof status === 'object' && 'error' in status
          ? status.error
          : null;
      }),
    })),
  );
}

export function setPending(): { requestStatus: RequestStatus };
export function setPending<T extends string>(
  name: T,
): RequestStatusNamedState<T>;
export function setPending<T extends string>(
  name?: T,
): { requestStatus: RequestStatus } | RequestStatusNamedState<T> {
  return name
    ? ({ [`${name}RequestStatus`]: 'pending' } as RequestStatusNamedState<T>)
    : { requestStatus: 'pending' };
}

export function setFulfilled(): { requestStatus: RequestStatus };
export function setFulfilled<T extends string>(
  name: T,
): RequestStatusNamedState<T>;
export function setFulfilled<T extends string>(
  name?: T,
): { requestStatus: RequestStatus } | RequestStatusNamedState<T> {
  return name
    ? ({ [`${name}RequestStatus`]: 'fulfilled' } as RequestStatusNamedState<T>)
    : { requestStatus: 'fulfilled' };
}

export function setError(error: string): {
  requestStatus: RequestStatus;
};
export function setError<T extends string>(
  error: string,
  name: T,
): RequestStatusNamedState<T>;
export function setError<T extends string>(
  error: string,
  name?: T,
): { requestStatus: RequestStatus } | RequestStatusNamedState<T> {
  return name
    ? ({ [`${name}RequestStatus`]: error } as RequestStatusNamedState<T>)
    : ({ requestStatus: error } as { requestStatus: RequestStatus });
}
