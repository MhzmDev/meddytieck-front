import { Routes } from '@angular/router';

export const PURCHASES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'suppliers',
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./suppliers/suppliers.route').then((m) => m.SUPPLIERS_ROUTES),
  },
//   {
//     path: 'brands',
//     loadComponent: () => import('./brands/pages/brands/brands.component').then((m) => m.BrandsComponent),
//   },
//   {
//     path: 'inventory',
//     loadComponent: () => import('./inventory/pages/inventory/inventory.component').then((m) => m.InventoryComponent),
//   },
];
