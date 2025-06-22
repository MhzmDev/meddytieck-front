import {
  EmptyFeatureResult,
  SignalStoreFeature,
  signalStoreFeature,
  withState,
} from '@ngrx/signals';
import {
  RequestStatusComputedState,
  RequestStatusNamedState,
  withRequestStatus,
} from './with-request-status.feature';

type Max9Array<T> = [T?, T?, T?, T?, T?, T?, T?, T?, T?];

export function withMultipleRequestStatus<T1 extends string>(
  n1: T1,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1>;
    props: RequestStatusComputedState<T1>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<T1 extends string, T2 extends string>(
  n1: T1,
  n2: T2,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> & RequestStatusNamedState<T2>;
    props: RequestStatusComputedState<T1> & RequestStatusComputedState<T2>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
>(
  n1: T1,
  n2: T2,
  n3: T3,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> &
      RequestStatusNamedState<T2> &
      RequestStatusNamedState<T3>;
    props: RequestStatusComputedState<T1> &
      RequestStatusComputedState<T2> &
      RequestStatusComputedState<T3>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
>(
  n1: T1,
  n2: T2,
  n3: T3,
  n4: T4,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> &
      RequestStatusNamedState<T2> &
      RequestStatusNamedState<T3> &
      RequestStatusNamedState<T4>;
    props: RequestStatusComputedState<T1> &
      RequestStatusComputedState<T2> &
      RequestStatusComputedState<T3> &
      RequestStatusComputedState<T4>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  T5 extends string,
>(
  n1: T1,
  n2: T2,
  n3: T3,
  n4: T4,
  n5: T5,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> &
      RequestStatusNamedState<T2> &
      RequestStatusNamedState<T3> &
      RequestStatusNamedState<T4> &
      RequestStatusNamedState<T5>;
    props: RequestStatusComputedState<T1> &
      RequestStatusComputedState<T2> &
      RequestStatusComputedState<T3> &
      RequestStatusComputedState<T4> &
      RequestStatusComputedState<T5>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  T5 extends string,
  T6 extends string,
>(
  n1: T1,
  n2: T2,
  n3: T3,
  n4: T4,
  n5: T5,
  n6: T6,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> &
      RequestStatusNamedState<T2> &
      RequestStatusNamedState<T3> &
      RequestStatusNamedState<T4> &
      RequestStatusNamedState<T5> &
      RequestStatusNamedState<T6>;
    props: RequestStatusComputedState<T1> &
      RequestStatusComputedState<T2> &
      RequestStatusComputedState<T3> &
      RequestStatusComputedState<T4> &
      RequestStatusComputedState<T5> &
      RequestStatusComputedState<T6>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  T5 extends string,
  T6 extends string,
  T7 extends string,
>(
  n1: T1,
  n2: T2,
  n3: T3,
  n4: T4,
  n5: T5,
  n6: T6,
  n7: T7,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> &
      RequestStatusNamedState<T2> &
      RequestStatusNamedState<T3> &
      RequestStatusNamedState<T4> &
      RequestStatusNamedState<T5> &
      RequestStatusNamedState<T6> &
      RequestStatusNamedState<T7>;
    props: RequestStatusComputedState<T1> &
      RequestStatusComputedState<T2> &
      RequestStatusComputedState<T3> &
      RequestStatusComputedState<T4> &
      RequestStatusComputedState<T5> &
      RequestStatusComputedState<T6> &
      RequestStatusComputedState<T7>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  T5 extends string,
  T6 extends string,
  T7 extends string,
  T8 extends string,
>(
  n1: T1,
  n2: T2,
  n3: T3,
  n4: T4,
  n5: T5,
  n6: T6,
  n7: T7,
  n8: T8,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> &
      RequestStatusNamedState<T2> &
      RequestStatusNamedState<T3> &
      RequestStatusNamedState<T4> &
      RequestStatusNamedState<T5> &
      RequestStatusNamedState<T6> &
      RequestStatusNamedState<T7> &
      RequestStatusNamedState<T8>;
    props: RequestStatusComputedState<T1> &
      RequestStatusComputedState<T2> &
      RequestStatusComputedState<T3> &
      RequestStatusComputedState<T4> &
      RequestStatusComputedState<T5> &
      RequestStatusComputedState<T6> &
      RequestStatusComputedState<T7> &
      RequestStatusComputedState<T8>;
    // eslint-disable-next-line
    methods: {};
  }
>;
export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  T5 extends string,
  T6 extends string,
  T7 extends string,
  T8 extends string,
  T9 extends string,
>(
  n1: T1,
  n2: T2,
  n3: T3,
  n4: T4,
  n5: T5,
  n6: T6,
  n7: T7,
  n8: T8,
  n9: T9,
): SignalStoreFeature<
  EmptyFeatureResult,
  {
    state: RequestStatusNamedState<T1> &
      RequestStatusNamedState<T2> &
      RequestStatusNamedState<T3> &
      RequestStatusNamedState<T4> &
      RequestStatusNamedState<T5> &
      RequestStatusNamedState<T6> &
      RequestStatusNamedState<T7> &
      RequestStatusNamedState<T8> &
      RequestStatusNamedState<T9>;
    props: RequestStatusComputedState<T1> &
      RequestStatusComputedState<T2> &
      RequestStatusComputedState<T3> &
      RequestStatusComputedState<T4> &
      RequestStatusComputedState<T5> &
      RequestStatusComputedState<T6> &
      RequestStatusComputedState<T7> &
      RequestStatusComputedState<T8> &
      RequestStatusComputedState<T9>;
    // eslint-disable-next-line
    methods: {};
  }
>;

export function withMultipleRequestStatus<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  T4 extends string,
  T5 extends string,
  T6 extends string,
  T7 extends string,
  T8 extends string,
  T9 extends string,
>(
  n1: T1,
  n2?: T2,
  n3?: T3,
  n4?: T4,
  n5?: T5,
  n6?: T6,
  n7?: T7,
  n8?: T8,
  n9?: T9,
) {
  const features = [] as Max9Array<SignalStoreFeature>;
  if (n1) features.push(withRequestStatus(n1));
  if (n2) features.push(withRequestStatus(n2));
  if (n3) features.push(withRequestStatus(n3));
  if (n4) features.push(withRequestStatus(n4));
  if (n5) features.push(withRequestStatus(n5));
  if (n6) features.push(withRequestStatus(n6));
  if (n7) features.push(withRequestStatus(n7));
  if (n8) features.push(withRequestStatus(n8));
  if (n9) features.push(withRequestStatus(n9));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return signalStoreFeature(withState({}), ...(features as Max9Array<any>));
}
