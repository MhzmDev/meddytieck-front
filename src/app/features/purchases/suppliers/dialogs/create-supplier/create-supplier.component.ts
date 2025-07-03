import { Component, inject, model, output, OnInit, effect } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { SuppliersStore } from '../../store/suppliers.store';
import { DynamicValidatorMessage } from '../../../../../shared/components/form-errors/dynamic-validator-message.directive';
import { CustomValidatorsService } from '../../../../../shared/services/custom-validators/custom-validators.service';

@Component({
  selector: 'mtk-create-supplier',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslateModule,
    TranslatePipe,
    AsyncPipe,
    DynamicValidatorMessage
  ],
  templateUrl: './create-supplier.component.html',
})
export class CreateSupplierComponent {
  readonly visible = model.required<boolean>();
  readonly success = output<void>();

  readonly suppliersStore = inject(SuppliersStore);
  private fb = inject(NonNullableFormBuilder);
  // Using static methods from CustomValidatorsService
  
  loading$ = this.suppliersStore.loading$;

  readonly form = this.fb.group({
    nameEn: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      CustomValidatorsService.isEnglish
    ]),
    nameAr: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      CustomValidatorsService.isArabic
    ]),
    phoneNumber: this.fb.control('', [
      Validators.required, 
      Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    ]),
    address: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200)
    ])
  });
  
  constructor() {
    // Reset form when dialog opens
    effect(() => {
      if (this.visible()) {
        this.form.reset();
      }
    });
  }

  onCancel() {
    this.form.reset();
    this.visible.set(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.form.valid) {
      this.suppliersStore.createSupplier({
        nameEn: this.form.value.nameEn!,
        nameAr: this.form.value.nameAr!,
        phoneNumber: this.form.value.phoneNumber!,
        address: this.form.value.address!
      }).subscribe(() => {
        this.form.reset();
        this.visible.set(false);
        this.success.emit();
      });
    }
  }
}
