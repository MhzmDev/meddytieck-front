import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _messageService = inject(MessageService);
  private translate = inject(TranslateService);

  success(message: string) {
    this._messageService.add({
      severity: 'success',
      summary: `${this.translate.instant('TOASTR.SUCCESS')}`,
      detail: this.translate.instant(message),
    });
  }

  info(message: string) {
    this._messageService.add({
      severity: 'info',
      summary: `${this.translate.instant('TOASTR.INFO')}`,
      detail: this.translate.instant(message),
    });
  }

  warn(message: string) {
    this._messageService.add({
      severity: 'warn',
      summary: `${this.translate.instant('TOASTR.WARN')}`,
      detail: this.translate.instant(message),
    });
  }

  error(message: string) {
    this._messageService.add({
      severity: 'error',
      summary: `${this.translate.instant('TOASTR.ERROR')}`,
      detail: this.translate.instant(message),
    });
  }
}
