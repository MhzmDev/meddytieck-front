import { Routes } from '@angular/router';

export const route: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/employees/employees.component').then(
        (m) => m.EmployeesComponent,
      ),
  },
];
