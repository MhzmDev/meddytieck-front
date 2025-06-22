import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

interface CacheEntry<T> {
  response: HttpResponse<T>;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheEntry<unknown>>();

  private generateCacheKey(
    url: string,
    method: string,
    headers: HttpHeaders,
  ): string {
    return `${method}:${url}:${JSON.stringify(headers.keys().map((key) => [key, headers.get(key)]))}`;
  }

  get<T>(
    url: string,
    method: string,
    headers: HttpHeaders,
  ): HttpResponse<T> | null {
    const key = this.generateCacheKey(url, method, headers);
    return (this.cache.get(key) as CacheEntry<T> | undefined)?.response ?? null;
  }

  set<T>(
    url: string,
    method: string,
    headers: HttpHeaders,
    response: HttpResponse<T>,
  ): void {
    const key = this.generateCacheKey(url, method, headers);
    this.cache.set(key, { response });
  }

  clear(): void {
    this.cache.clear();
  }

  delete(url: string, method: string, headers: HttpHeaders): void {
    const key = this.generateCacheKey(url, method, headers);
    this.cache.delete(key);
  }
}
