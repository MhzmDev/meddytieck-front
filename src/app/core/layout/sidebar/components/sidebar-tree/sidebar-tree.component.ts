import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { SidebarNode } from '../../model/sidebar.model';
import { SidebarNodeComponent } from '../sidebar-node/sidebar-node.component';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { findNodeWithParentsHasRoute } from '../../utils/find-node-with-parents-has-route';

@Component({
  selector: 'mtk-sidebar-tree',
  imports: [SidebarNodeComponent],
  templateUrl: './sidebar-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarTreeComponent {
  readonly nodes = input.required<SidebarNode[]>();
  readonly listContainer = input.required<HTMLDivElement>();
  readonly selectedNode = signal<SidebarNode | null>(null);
  readonly expandedNodes = signal<SidebarNode[]>([]);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.handleSelectedNodeFromUrl();
    });
  }

  handleSelectedNodeFromUrl() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event.urlAfterRedirects),
        startWith(this.router.url),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((route) => {
        const { node, parents } = findNodeWithParentsHasRoute(
          this.nodes(),
          route,
        );
        this.selectedNode.set(node);
        this.expandedNodes.set(parents);
      });
  }

  onExpandNode(node: SidebarNode[]) {
    this.expandedNodes.set(node);
  }
}
