import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { CustomValidatorsService } from '../../../../shared/services/custom-validators/custom-validators.service';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'mtk-create-employee',
  imports: [
    Dialog,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    Button,
    DynamicValidatorMessage,
    TranslatePipe,
  ],
  templateUrl: './create-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeComponent {
  readonly visible = model.required<boolean>();
  readonly success = output<boolean>();

  readonly employeesStore = inject(EmployeesStore);
  private fb = inject(NonNullableFormBuilder);
  
  // Filter out department with ID 1 (administration)
  readonly filteredDepartments = computed(() => {
    return this.employeesStore.departments().filter(dept => dept.id !== 1);
  });
  readonly form = this.fb.group({
    firstNameEn: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isEnglish,
    ]),
    firstNameAr: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isArabic,
    ]),
    midNameEn: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isEnglish,
    ]),
    midNameAr: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isArabic,
    ]),
    lastNameEn: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isEnglish,
    ]),
    lastNameAr: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isArabic,
    ]),
    fullAddress: this.fb.control('', [Validators.required]),
    identityNO: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    userName: this.fb.control('', []), //
    email: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isEmail,
    ]),
    phoneNumber: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isPhone,
    ]),
    departmentId: this.fb.control(0, [Validators.required]),
    joBTitle: this.fb.control('', []),
    areaId: this.fb.control(0, [Validators.required]),
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    await this.employeesStore.addEmployee({
      ...this.form.getRawValue(),
      displayName: `${this.form.getRawValue().firstNameEn} ${
        this.form.getRawValue().midNameEn
      }`,
      userName: `${this.form.getRawValue().firstNameEn}_${this.form.getRawValue().lastNameEn}`,
    });
    if (this.employeesStore.isCreateEmployeeFulfilled()) {
      this.visible.set(false);
      this.success.emit(true);
    }
  }
}
