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
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { TranslateFieldPipe } from '../../../../shared/pipes/translate-field.pipe';
import { SystemRole } from '../../../../shared/services/buisness/system-roles/system-roles.model';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'mtk-edit-employees-permissions',
  imports: [
    Button,
    Dialog,
    FormsModule,
    ReactiveFormsModule,
    ToggleSwitch,
    TranslateFieldPipe,
    TranslatePipe,
  ],
  templateUrl: './edit-employees-permissions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeesPermissionsComponent {
  readonly visible = model.required<boolean>();
  readonly id = input.required<string>();
  readonly success = output<boolean>();

  readonly employeesStore = inject(EmployeesStore);
  readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    roles: this.fb.array(
      [] as FormGroup<{
        role: FormControl<SystemRole>;
        active: FormControl<boolean>;
      }>[],
    ),
  });

  constructor() {
    effect(() => {
      const roles = this.employeesStore.roles();
      if (!roles.length) return;
      untracked(() => {
        this.form.setControl(
          'roles',
          this.fb.array(
            roles.map((role) => this.fb.group({ role, active: false })),
          ),
        );
      });
    });
  }

  async onSubmit() {
    const body =
      this.form.getRawValue().roles.map((role) => ({
        roleKey: role.role.key,
        active: role.active,
      })) ?? [];

    await this.employeesStore.updateUserRoles(this.id(), body);
    if (this.employeesStore.isUpdateUserRolesFulfilled()) {
      this.visible.set(false);
      this.success.emit(true);
    }
  }
}
