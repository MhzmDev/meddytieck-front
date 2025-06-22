import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Card } from 'primeng/card';
import { Menu } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { Ripple } from 'primeng/ripple';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TypedNgTemplateDirective } from '../../directives/typed-ng-template.directive';
import { IconComponent } from '../icon/icon.component';
import { MenuComponent } from '../menu/menu.component';
import { TableComponent } from './table.component';
import { mtkTemplateDirective } from '../../directives/mtk-template.directive';
@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    TableModule,
    TypedNgTemplateDirective,
    TranslatePipe,
    mtkTemplateDirective,
    Menu,
    IconComponent,
    Ripple,
    MenuComponent,
    Skeleton,
    Card,
    PaginatorModule,
  ],
  exports: [TableComponent, mtkTemplateDirective],
})
export class mtkTableModule {}
