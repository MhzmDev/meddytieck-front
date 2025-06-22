import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  ControlValueAccessorBase,
  provideValueAccessor,
} from '../../directives/control-value-accessor.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { TranslationService } from '../../services/translation/translation.service';
import { LabelKeys } from '../../utils/type-utils';

@Component({
  selector: 'mtk-select',
  imports: [ReactiveFormsModule, Select],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(SelectComponent)],
})
export class SelectComponent<
  T extends object,
  K extends keyof T & string,
> extends ControlValueAccessorBase<T[K]> {
  readonly options = input.required<T[]>();
  readonly optionLabel = input.required<LabelKeys<T> | (keyof T & string)>();
  readonly optionValue = input.required<K>();
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly loading = input(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly appendTo = input<any>('body');
  readonly showClear = input(true);

  readonly translationService = inject(TranslationService);

  getLabel() {
    if (
      this.options()[0] &&
      `${this.optionLabel()}Ar` in this.options()[0] &&
      `${this.optionLabel()}En` in this.options()[0]
    ) {
      return this.translationService.isArabic()
        ? `${this.optionLabel()}Ar`
        : `${this.optionLabel()}En`;
    }
    return this.optionLabel();
  }
}
