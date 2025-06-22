import {
  ChangeDetectionStrategy,
  Component,
  input,
  viewChild,
} from '@angular/core';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { contextType } from '../../utils/context-type';
import { TypedNgTemplateDirective } from '../../directives/typed-ng-template.directive';
import { IconComponent } from '../icon/icon.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'mtk-menu',
  imports: [Menu, TypedNgTemplateDirective, IconComponent, TranslatePipe],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  readonly menuItems = input<MenuItem[]>();
  readonly menu = viewChild<Menu>('menu');
  readonly itemContextType = contextType<MenuItem>();

  toggle(event: Event) {
    this.menu()?.toggle(event);
  }
}
