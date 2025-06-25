import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
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
  selector: 'mtk-edit-area',
  imports: [
    Dialog,
    ReactiveFormsModule,
    InputComponent,
    Button,
    DynamicValidatorMessage,
    TranslatePipe,
  ],
  templateUrl: './edit-area.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAreaComponent implements OnInit {
  readonly visible = model.required<boolean>();
  readonly areaId = input.required<number>();

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

  constructor() {
    effect(() => {
      const area = this.areasStore.area();
      if (area) {
        this.form.patchValue({
          nameAr: area.nameAr,
          nameEn: area.nameEn,
        });
      }
    });
  }

  ngOnInit(): void {
    this.areasStore.getAreaById(this.areaId());
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    await this.areasStore.updateArea({
      id: this.areaId(),
      ...this.form.getRawValue(),
    });
    
    if (this.areasStore.isUpdateAreaFulfilled()) {
      this.visible.set(false);
    }
  }
}
