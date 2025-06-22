import { Injectable } from '@angular/core';
import { LocalStorageKeysTypes } from './local-storage-keys-types.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  prefix = 'mtk-';

  getItem<k extends keyof LocalStorageKeysTypes, T = LocalStorageKeysTypes[k]>(
    key: k,
  ): T | null {
    const data = window.localStorage.getItem(this.prefix + key);
    if (data === null) return data;
    try {
      return JSON.parse(data) as T;
    } catch (error: unknown) {
      console.error(
        'from localStorage service parse error: ',
        error,
        'data: ',
        data,
      );
      return null;
    }
  }

  setItem<k extends keyof LocalStorageKeysTypes>(
    key: k,
    value: LocalStorageKeysTypes[k],
  ): void {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(this.prefix + key, data);
  }

  removeItem<k extends keyof LocalStorageKeysTypes>(key: k): void {
    window.localStorage.removeItem(this.prefix + key);
  }

  hasItem<k extends keyof LocalStorageKeysTypes>(key: k): boolean {
    return window.localStorage.getItem(this.prefix + key) !== null;
  }

  clear(): void {
    window.localStorage.clear();
  }
}
