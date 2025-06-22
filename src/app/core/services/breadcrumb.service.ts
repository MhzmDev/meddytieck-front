import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly data: Record<string, string> = {};

  setBreadcrumbLabel(key: string, value: string) {
    this.data[key] = value;
  }
  getBreadcrumbLabel(label: string) {
    const key = label.replace('{', '').replace('}', '');
    return this.data[key] || 'N/A';
  }
}
