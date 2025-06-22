/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EmptyFeatureResult,
  Prettify,
  signalStoreFeature,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  withState,
} from '@ngrx/signals';

type PrettifyFeatureResult<R extends SignalStoreFeatureResult> = Prettify<{
  state: Prettify<R['state']>;
  props: Prettify<R['props']>;
  methods: Prettify<R['methods']>;
}>;

export function withFeatures<F1 extends SignalStoreFeatureResult>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1>>;

export function withFeatures<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2>>;

export function withFeatures<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<F1 & F2, F3>,
): SignalStoreFeature<EmptyFeatureResult, PrettifyFeatureResult<F1 & F2 & F3>>;

export function withFeatures<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<F1 & F2, F3>,
  f4: SignalStoreFeature<F1 & F2 & F3, F4>,
): SignalStoreFeature<
  EmptyFeatureResult,
  PrettifyFeatureResult<F1 & F2 & F3 & F4>
>;

export function withFeatures<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<F1 & F2, F3>,
  f4: SignalStoreFeature<F1 & F2 & F3, F4>,
  f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>,
): SignalStoreFeature<
  EmptyFeatureResult,
  PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5>
>;

export function withFeatures<
  F1 extends SignalStoreFeatureResult,
  F2 extends SignalStoreFeatureResult,
  F3 extends SignalStoreFeatureResult,
  F4 extends SignalStoreFeatureResult,
  F5 extends SignalStoreFeatureResult,
  F6 extends SignalStoreFeatureResult,
>(
  f1: SignalStoreFeature<EmptyFeatureResult, F1>,
  f2: SignalStoreFeature<{} & F1, F2>,
  f3: SignalStoreFeature<F1 & F2, F3>,
  f4: SignalStoreFeature<F1 & F2 & F3, F4>,
  f5: SignalStoreFeature<F1 & F2 & F3 & F4, F5>,
  f6: SignalStoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
): SignalStoreFeature<
  EmptyFeatureResult,
  PrettifyFeatureResult<F1 & F2 & F3 & F4 & F5 & F6>
>;

// continue to F10 as needed...

export function withFeatures(
  ...features: SignalStoreFeature<any, any>[]
): SignalStoreFeature<any, any> {
  return signalStoreFeature(withState({}), ...(features as unknown as [any]));
}
