import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Ripple } from 'primeng/ripple';
import { filter, map, switchMap } from 'rxjs';
import { AuthStore } from '../../../features/auth/store/auth.store';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { TranslationService } from '../../../shared/services/translation/translation.service';
import { getRouteLastChild } from '../../../shared/utils/get-route-last-child';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'mtk-header',
  imports: [
    Ripple,
    IconComponent,
    TranslatePipe,
    MenuComponent,
    Breadcrumb,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  private readonly translationService = inject(TranslationService);
  private readonly authStore = inject(AuthStore);
  private readonly breadcrumbService = inject(BreadcrumbService);

  private readonly data$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map(() => this.route.firstChild),
    filter((child) => child instanceof ActivatedRoute),
    map((child) => getRouteLastChild(child)),
    switchMap((child) => child.data),
  );

  readonly headerTitle = toSignal(
    this.data$.pipe(map((data) => data['title'])),
  );
  readonly isBreadcrumb = computed(() => Array.isArray(this.headerTitle()));
  readonly headerSubtitle = toSignal(
    this.data$.pipe(map((data) => data['subtitle'])),
  );
  readonly menuItems: MenuItem[] = [
    {
      items: [
        {
          label: 'logout',
          command: () => {
            this.authStore.logout();
          },
        },
      ],
    },
  ];

  get lastRoute() {
    return getRouteLastChild(this.route);
  }

  onToggleLang() {
    this.translationService.toggleLang();
  }
  getBreadcrumbLabel(item: MenuItem) {
    if (item.label?.startsWith('{') && item.label?.endsWith('}')) {
      return this.breadcrumbService.getBreadcrumbLabel(item.label);
    }
    return item.label ?? '';
  }
}
