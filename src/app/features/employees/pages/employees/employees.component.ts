import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { SuccessDialogComponent } from '../../../../shared/components/dialogs/success-dialog/success-dialog.component';
import { EmployeesFilterComponent } from '../../components/employees-filter/employees-filter.component';
import { EmployeesTableComponent } from '../../components/employees-table/employees-table.component';
import { CreateEmployeeComponent } from '../../dialogs/create-employee/create-employee.component';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'mtk-employees',
  imports: [
    Card,
    Button,
    Divider,
    EmployeesFilterComponent,
    EmployeesTableComponent,
    TranslatePipe,
    CreateEmployeeComponent,
    SuccessDialogComponent,
  ],
  templateUrl: './employees.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EmployeesStore],
})
export class EmployeesComponent {
  readonly showCreateEmployee = signal(false);
  readonly showSuccessDialog = signal(false);
}
