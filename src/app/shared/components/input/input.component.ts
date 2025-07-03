import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Skeleton } from 'primeng/skeleton';
import { Textarea } from 'primeng/textarea';
import {
  ControlValueAccessorBase,
  provideValueAccessor,
} from '../../directives/control-value-accessor.directive';
import { IconComponent } from '../icon/icon.component';
@Component({
  selector: 'mtk-input',
  imports: [
    IconField,
    InputText,
    InputIcon,
    IconComponent,
    ReactiveFormsModule,
    Password,
    InputNumber,
    NgClass,
    Skeleton,
    Textarea,
    TranslateModule,
  ],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(InputComponent)],
  styles: `
    :host-context(html[dir='rtl']) input[type='tel'] {
      text-align: right;
    }
  `,
})
export class InputComponent extends ControlValueAccessorBase<string> {
  readonly fullWidth = input(false, { transform: booleanAttribute });

  @HostBinding('class.w-full')
  get fullWidthValue() {
    return this.fullWidth();
  }
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly type = input<
    'text' | 'password' | 'email' | 'number' | 'tel' | 'textarea'
  >('text');
  readonly icon = input<string>();
  readonly iconClass = input<string>('');
  readonly mode = input<'decimal' | 'currency'>();
  readonly loading = input(false);
  readonly autoResize = input(false, { transform: booleanAttribute });
}
