import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { InputSwitch } from 'primeng/inputswitch';
import { ConfirmationDialogComponent } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialogs/success-dialog/success-dialog.component';
import { TableColumns } from '../../../../shared/components/table/models/table.model';
import { mtkTableModule } from '../../../../shared/components/table/table.module';
import { TranslationService } from '../../../../shared/services/translation/translation.service';
import { translateField } from '../../../../shared/utils/translate-field';
import { translatedName } from '../../../../shared/utils/translated-name';
import { EditEmployeesPermissionsComponent } from '../../dialogs/edit-employees-permissions/edit-employees-permissions.component';
import { ViewEditEmployeeComponent } from '../../dialogs/view-edit-employee/view-edit-employee.component';
import { Employee } from '../../models/employees.model';
import { EmployeesStore } from '../../store/employees.store';
@Component({
  selector: 'mtk-employees-table',
  imports: [
    mtkTableModule,
    InputSwitch,
    FormsModule,
    ViewEditEmployeeComponent,
    EditEmployeesPermissionsComponent,
    ConfirmationDialogComponent,
    SuccessDialogComponent,
  ],
  templateUrl: './employees-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent {
  private readonly translationService = inject(TranslationService);
  readonly employeesStore = inject(EmployeesStore);

  readonly showEditViewEmployee = signal(false);
  readonly showEditEmployeesRoles = signal(false);

  readonly viewMode = signal(true);
  readonly selectedId = signal<string>('');

  readonly showConfirmDeleteUser = signal(false);
  readonly confirmDeleteUserLoading = signal(false);
  readonly showSuccessDialog = signal(false);

  readonly tableColumns = computed<TableColumns<Employee>>(() => {
    const lang = this.translationService.currentLang();
    return [
      {
        header: 'Id',
        field: 'id',
      },
      {
        header: 'TABLE.NAME',
        field: translatedName(lang, 'displayName'),
      },
      {
        header: 'TABLE.PHONE',
        field: 'phoneNumber',
      },
      {
        header: 'TABLE.ADDRESS',
        field: 'fullAddress',
      },
      {
        header: 'TABLE.NATIONAL_ID',
        field: 'identityNO',
      },
      {
        header: 'TABLE.AREA',
        computedValue(item) {
          return translateField(lang, item.area, 'name');
        },
      },
      {
        header: 'TABLE.EMAIL',
        field: 'email',
      },
      {
        header: 'TABLE.STATUS',
        templateName: 'status',
      },
    ];
  });

  readonly menuItems: MenuItem[] = [
    {
      label: 'MENU_ITEMS.SHOW',
      icon: 'eye',
      command: (event: MenuItemCommandEvent) => {
        this.selectedId.set(event.item?.['rowData']?.id);
        this.showEditViewEmployee.set(true);
        this.viewMode.set(true);
      },
    },
    {
      label: 'MENU_ITEMS.DATA',
      icon: 'edit',
      command: (event: MenuItemCommandEvent) => {
        this.selectedId.set(event.item?.['rowData']?.id);
        this.showEditViewEmployee.set(true);
        this.viewMode.set(false);
      },
    },
    {
      label: 'MENU_ITEMS.PERMISSIONS',
      icon: 'edit',
      command: (event: MenuItemCommandEvent) => {
        this.selectedId.set(event.item?.['rowData']?.id);
        this.showEditEmployeesRoles.set(true);
      },
    },
    {
      label: 'MENU_ITEMS.DELETE',
      icon: 'trash',
      command: (event: MenuItemCommandEvent) => {
        const id = event.item?.['rowData']?.id;
        this.selectedId.set(id);
        if (!id) return;

        this.onDeleteUser();
      },
    },
  ];

  onStatusChange(employee: Employee) {
    if (employee.active) {
      this.employeesStore.deactivateUser(employee.id).then();
      return;
    }
    this.employeesStore.activateUser(employee.id).then();
  }

  onDeleteUser() {
    this.showConfirmDeleteUser.set(true);
  }
  async onConfirmDeleteUser() {
    this.confirmDeleteUserLoading.set(true);
    await this.employeesStore.deleteUser(this.selectedId());
    if (this.employeesStore.isDeleteUserFulfilled()) {
      this.showConfirmDeleteUser.set(false);
      this.confirmDeleteUserLoading.set(false);
    }
  }
}
