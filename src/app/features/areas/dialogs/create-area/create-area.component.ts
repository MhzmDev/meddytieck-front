import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DynamicValidatorMessage } from '../../../../shared/components/form-errors/dynamic-validator-message.directive';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { CustomValidatorsService } from '../../../../shared/services/custom-validators/custom-validators.service';
import { AreasStore } from '../../store/areas.store';

@Component({
  selector: 'mtk-create-area',
  imports: [
    Dialog,
    ReactiveFormsModule,
    InputComponent,
    Button,
    DynamicValidatorMessage,
    TranslatePipe,
  ],
  templateUrl: './create-area.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAreaComponent {
  readonly visible = model.required<boolean>();
  readonly success = output<boolean>();

  readonly areasStore = inject(AreasStore);
  private fb = inject(NonNullableFormBuilder);
  readonly form = this.fb.group({
    nameEn: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isEnglish,
    ]),
    nameAr: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isArabic,
    ]),
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    await this.areasStore.addArea(this.form.getRawValue());
    if (this.areasStore.isCreateAreaFulfilled()) {
      this.visible.set(false);
      this.success.emit(true);
    }
  }
}
