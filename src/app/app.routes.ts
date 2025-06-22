import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
// import { CategoriesStore } from './features/departments/store/categories.store';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/auth/auth.route').then((m) => m.route),
  },
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      // {
      //   path: 'banner-management',
      //   loadChildren: () =>
      //     import('./features/banner-management/banner-management.route').then(
      //       (m) => m.route,
      //     ),
      //   data: {
      //     pageTitle: 'SIDEBAR.BANNER_MANAGEMENT',
      //     title: 'BANNER_MANAGEMENT.TITLE',
      //   },
      // },
      // {
      //   path: 'bill-of-lading',
      //   loadChildren: () =>
      //     import('./features/bill-of-lading/bill-of-lading.route').then(
      //       (m) => m.route,
      //     ),
      //   data: {
      //     pageTitle: 'SIDEBAR.BILL_OF_LADING',
      //     title: 'BILL_OF_LADING.TITLE',
      //   },
      // },
      // {
      //   path: 'bundles',
      //   loadChildren: () =>
      //     import('./features/bundles/bundles.route').then((m) => m.route),
      //   data: {
      //     pageTitle: 'SIDEBAR.BUNDLES',
      //     title: 'BUNDLES.TITLE',
      //   },
      // },
      // {
      //   path: 'clients',
      //   loadChildren: () =>
      //     import('./features/clients/clients.route').then((m) => m.route),
      //   data: {
      //     pageTitle: 'SIDEBAR.CLIENTS',
      //     title: 'CLIENTS.TITLE',
      //   },
      // },
      // {
      //   path: 'customer-service',
      //   loadChildren: () =>
      //     import('./features/customer-service/customer-service.route').then(
      //       (m) => m.route,
      //     ),
      //   data: {
      //     pageTitle: 'SIDEBAR.CUSTOMER_SERVICE',
      //     title: 'CUSTOMER_SERVICE.TITLE',
      //   },
      // },
      // {
      //   path: 'categories',
      //   loadChildren: () =>
      //     import('./features/departments/departments.route').then(
      //       (m) => m.route,
      //     ),
      //   data: {
      //     pageTitle: 'SIDEBAR.DEPARTMENTS',
      //     title: 'DEPARTMENTS.TITLE',
      //   },
      //   providers: [CategoriesStore],
      // },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employees/employees.route').then((m) => m.route),
        data: {
          pageTitle: 'SIDEBAR.EMPLOYEES',
          title: 'EMPLOYEES.TITLE',
        },
      },
      // {
      //   path: 'inspection-department',
      //   loadChildren: () =>
      //     import(
      //       './features/inspection-department/inspection-department.route'
      //     ).then((m) => m.route),
      //   data: {
      //     pageTitle: 'SIDEBAR.INSPECTION_DEPARTMENT',
      //     title: 'INSPECTION_DEPARTMENT.TITLE',
      //   },
      // },
      // {
      //   path: 'merchants',
      //   loadChildren: () =>
      //     import('./features/merchants/merchants.route').then((m) => m.route),
      //   data: {
      //     pageTitle: 'SIDEBAR.MERCHANTS',
      //     title: 'MERCHANTS.TITLE',
      //   },
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () =>
      //     import('./features/notifications/notifications.route').then(
      //       (m) => m.route,
      //     ),
      //   data: {
      //     pageTitle: 'SIDEBAR.NOTIFICATIONS',
      //     title: 'NOTIFICATIONS.TITLE',
      //   },
      // },
      // {
      //   path: 'seda-products',
      //   loadChildren: () =>
      //     import('./features/seda-products/seda-products.route').then(
      //       (m) => m.route,
      //     ),
      //   data: {
      //     pageTitle: 'SIDEBAR.SEDA_PRODUCTS',
      //     title: 'SEDA_PRODUCTS.TITLE',
      //   },
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () =>
      //     import('./features/settings/settings.route').then((m) => m.route),
      //   data: {
      //     pageTitle: 'SIDEBAR.SETTINGS',
      //     title: 'SETTINGS.TITLE',
      //   },
      // },
      // {
      //   path: 'settlement-requests',
      //   loadChildren: () =>
      //     import(
      //       './features/settlement-requests/settlement-requests.route'
      //     ).then((m) => m.route),
      //   data: {
      //     pageTitle: 'SIDEBAR.SETTLEMENT_REQUESTS',
      //     title: 'SETTLEMENT_REQUESTS.TITLE',
      //   },
      // },
    ],
  },
  { path: '**', redirectTo: '/' },
];
