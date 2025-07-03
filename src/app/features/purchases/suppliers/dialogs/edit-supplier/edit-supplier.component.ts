import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  output,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicValidatorMessage } from '../../../../../shared/components/form-errors/dynamic-validator-message.directive';
import { SuppliersStore } from '../../store/suppliers.store';
import { Supplier } from '../../models/suppliers.model';
import { CustomValidatorsService } from '../../../../../shared/services/custom-validators/custom-validators.service';

@Component({
  selector: 'mtk-edit-supplier',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    DynamicValidatorMessage,
    TranslatePipe,
    AsyncPipe
  ],
  templateUrl: './edit-supplier.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSupplierComponent {
  readonly visible = model.required<boolean>();
  readonly supplierId = input.required<number>();
  readonly success = output<void>();

  readonly suppliersStore = inject(SuppliersStore);
  private fb = inject(NonNullableFormBuilder);
  loading$ = this.suppliersStore.loading$;

  readonly form = this.fb.group({
    nameEn: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      CustomValidatorsService.isEnglish,
    ]),
    nameAr: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      CustomValidatorsService.isArabic,
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
    effect(() => {
      const supplier = this.suppliersStore.supplier();
      if (supplier) {
        this.form.patchValue({
          nameAr: supplier.nameAr,
          nameEn: supplier.nameEn,
          phoneNumber: supplier.phoneNumber,
          address: supplier.address || ''
        });
      }
    });
  }
  
  ngOnInit(): void {
    // If we have a supplierId, get the supplier details
    if (this.supplierId()) {
      this.suppliersStore.getSupplierById(this.supplierId());
    } else {
      // Reset the form if we're creating a new supplier
      this.form.reset();
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const { nameEn, nameAr, phoneNumber, address } = this.form.getRawValue();
    const supplierId = this.supplierId();
    
    if (supplierId) {
      // Update existing supplier
      // Get current supplier to access rowVersion
      const currentSupplier = this.suppliersStore.supplier();
      await this.suppliersStore.updateSupplier({
        id: supplierId,
        nameEn,
        nameAr,
        phoneNumber,
        address,
        // Include rowVersion from current supplier if it exists
        rowVersion: currentSupplier?.rowVersion
      });
    } else {
      // Create new supplier
      await this.suppliersStore.createSupplier({
        nameEn,
        nameAr,
        phoneNumber,
        address
      });
    }
    
    // If operation was successful, emit success and close dialog
    if (this.suppliersStore.isCreateOrUpdateFulfilled()) {
      this.success.emit();
      this.visible.set(false);
    }
  }

  onCancel() {
    this.form.reset();
    this.visible.set(false);
  }
}
