import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  output,
  untracked,
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
import { Employee } from '../../models/employees.model';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'mtk-view-edit-employee',
  imports: [
    Dialog,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    Button,
    DynamicValidatorMessage,
    TranslatePipe,
  ],
  templateUrl: './view-edit-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEditEmployeeComponent {
  readonly id = input.required<string>();
  readonly view = model.required<boolean>();
  readonly visible = model.required<boolean>();
  readonly success = output<boolean>();

  readonly employeesStore = inject(EmployeesStore);
  private fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    id: this.fb.control('', []),
    firstNameEn: this.fb.control('', []),
    firstNameAr: this.fb.control('', []),
    lastNameEn: this.fb.control('', []),
    lastNameAr: this.fb.control('', []),
    fullAddress: this.fb.control('', [Validators.required]),
    identityNO: this.fb.control('', []),
    email: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isEmail,
    ]),
    phoneNumber: this.fb.control('', [
      Validators.required,
      CustomValidatorsService.isPhone,
    ]),
    departmentId: this.fb.control(0, []),
    joBTitle: this.fb.control('', []),
    areaId: this.fb.control(0, [Validators.required]),
  });

  constructor() {
    this.patchEmployeeToForm();
    this.updateFormDisable();
  }

  updateFormDisable() {
    effect(() => {
      const view = this.view();
      untracked(() => {
        if (view) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
    });
  }

  patchEmployeeToForm() {
    effect(() => {
      const id = this.id();
      if (!id) return;
      untracked(() => {
        this.employeesStore.getEmployeeById(id).then(() => {
          const employee = this.employeesStore.employee() as Employee;
          this.form.patchValue({
            ...employee,
          });
        });
      });
    });
  }

  async onSubmit() {
    if (this.view()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    await this.employeesStore.updateEmployee({
      areaId: this.form.getRawValue().areaId,
      email: this.form.getRawValue().email,
      fullAddress: this.form.getRawValue().fullAddress,
      id: this.form.getRawValue().id,
      joBTitle: this.form.getRawValue().joBTitle,
      phoneNumber: this.form.getRawValue().phoneNumber,
    });
    if (this.employeesStore.isUpdateEmployeeFulfilled()) {
      this.visible.set(false);
      this.success.emit(true);
    }
  }

  onEdit() {
    this.view.set(false);
  }
}
