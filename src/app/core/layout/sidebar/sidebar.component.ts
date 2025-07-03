import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SidebarNode } from './model/sidebar.model';
import { SidebarTreeComponent } from './components/sidebar-tree/sidebar-tree.component';

@Component({
  selector: 'mtk-sidebar',
  imports: [DrawerModule, CommonModule, IconComponent, SidebarTreeComponent],
  templateUrl: './sidebar.component.html',
  providers: [],
})
export class SidebarComponent {
  readonly sidebarNodes: SidebarNode[] = [
    {
      key: 'employees',
      label: 'SIDEBAR.EMPLOYEES',
      icon: 'user-group',
      route: 'employees',
    },
    {
      key: 'areas',
      label: 'SIDEBAR.AREAS',
      icon: '2-user',
      route: 'areas',
    },
    {
      key: 'purchases',
      label: 'SIDEBAR.PURCHASES',
      icon: 'headphone',
      children: [
        {
          key: 'suppliers',
          label: 'SIDEBAR.SUPPLIERS',
          route: 'purchase/suppliers',
        },
        {
          key: 'brands',
          label: 'SIDEBAR.BRANDS',
          route: 'purchase/brands',
        },
        {
          key: 'inventory',
          label: 'SIDEBAR.INVENTORY',
          route: 'purchases/inventory',
        },
      ],
    },
    {
      key: 'sales',
      label: 'SIDEBAR.SALES',
      icon: 'search',
      children: [
        {
          key: 'clients',
          label: 'SIDEBAR.CLIENTS',
          route: 'clients',
        },
      ],
    },
    {
      key: 'customer-service',
      label: 'SIDEBAR.CUSTOMER_SERVICE',
      icon: 'user-group',
      children: [
        {
          key: 'visits',
          label: 'SIDEBAR.VISITS',
          route: 'visits',
        },
        {
          key: 'check-list',
          label: 'SIDEBAR.CHECK_LIST',
          route: 'check-list',
        },
      ],
    },
    // {
    //   key: 'departments',
    //   label: 'SIDEBAR.DEPARTMENTS',
    //   icon: 'categories',
    //   route: 'categories',
    // },
    // {
    //   key: 'mtk-products',
    //   label: 'SIDEBAR.mtk_PRODUCTS',
    //   icon: 'box',
    //   route: 'mtk-products',
    // },
    // {
    //   key: 'banner-management',
    //   label: 'SIDEBAR.BANNER_MANAGEMENT',
    //   icon: 'presentation-chart',
    //   route: 'banner-management',
    // },
    // {
    //   key: 'notifications',
    //   label: 'SIDEBAR.NOTIFICATIONS',
    //   icon: 'notification',
    //   route: 'notifications',
    // },
    // {
    //   key: 'bundles',
    //   label: 'SIDEBAR.BUNDLES',
    //   icon: 'star',
    //   route: 'bundles',
    // },
    // {
    //   key: 'settings',
    //   label: 'SIDEBAR.SETTINGS',
    //   icon: 'gear',
    //   route: 'settings',
    // },
  ] as const;
}
