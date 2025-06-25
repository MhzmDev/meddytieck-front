import { Routes } from '@angular/router';

export const route: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/areas/areas.component').then(
        (m) => m.AreasComponent,
      ),
  },
];
