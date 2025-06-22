import { environment } from '../../../../environments/environment';
import { EmptyFeatureResult, SignalStoreFeature } from '@ngrx/signals';

export const withTreeShakableDevTools = environment.storeWithDevTools as (
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...features: any[]
) => SignalStoreFeature<EmptyFeatureResult, EmptyFeatureResult>;
