import { CommonModule } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconComponent } from '../../icon/icon.component';

export type DialogType = 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'mtk-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TranslateModule,
    IconComponent,
  ],
})
export class ConfirmationDialogComponent {
  visible = model.required<boolean>();
  title = input<string>();
  subtitle = input<string>();
  type = input<DialogType>('error');
  icon = input<string>('trash-2');
  confirmButtonLabel = input<string>('DIALOG.DELETE');
  confirmButtonLoading = input<boolean>(false);
  cancelButtonLabel = input<string>('DIALOG.BACK');
  confirmButtonSeverity = input<ButtonSeverity>('danger');

  confirm = output<void>();
  cancelClick = output<void>();

  get iconClass(): string {
    switch (this.type()) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      case 'info':
      default:
        return 'text-blue-500';
    }
  }

  onConfirmButtonClick(): void {
    this.confirm.emit();
  }

  onCancelButtonClick(): void {
    this.cancelClick.emit();
    this.visible.set(false);
  }
}
