import { Lang } from '../../constants/language';
import { AuthResponse } from '../../../features/auth/services/auth.model';

export enum LocalStorageKeys {
  UserLang = 'user-lang',
  Auth = 'auth',
}

export interface LocalStorageKeysTypes {
  [LocalStorageKeys.UserLang]: Lang;
  [LocalStorageKeys.Auth]: AuthResponse;
}
