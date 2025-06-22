import { CommonModule, KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessagePipe } from '../error-message.pipe';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'mtk-input-error',
  standalone: true,
  imports: [CommonModule, ErrorMessagePipe, ErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mtk-error
      *ngFor="let error of errors | keyvalue; trackBy: trackByFn"
      class="input-error"
    >
      {{ error.key | errorMessage: error.value }}
    </mtk-error>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class InputErrorComponent {
  @Input()
  errors: ValidationErrors | undefined | null = null;

  trackByFn(index: number, item: KeyValue<string, unknown>) {
    return item.key;
  }
}
