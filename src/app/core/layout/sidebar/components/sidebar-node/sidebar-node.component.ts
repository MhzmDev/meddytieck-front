import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { SidebarNode } from '../../model/sidebar.model';
import { TranslatePipe } from '@ngx-translate/core';
import { Ripple } from 'primeng/ripple';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../../../../shared/services/animation/animation.service';
import { Router } from '@angular/router';

const animations = [
  AnimationService.advancedCustom({
    triggerName: 'expand',
    transitions: [
      {
        stateChangeExpr: ':enter',
        style: {
          height: '0',
          opacity: '0',
        },
        animates: [
          {
            duration: 300,
            timingFunction: 'ease-out',
            style: {
              height: '*',
            },
          },
          {
            delay: 200,
            duration: 300,
            timingFunction: 'ease-out',
            style: {
              opacity: '1',
            },
          },
        ],
      },
    ],
  }),
  AnimationService.advancedCustom({
    triggerName: 'shrink',
    transitions: [
      {
        stateChangeExpr: ':leave',
        style: {
          height: '*',
          opacity: '1',
        },
        animates: [
          {
            delay: 100,
            duration: 300,
            timingFunction: 'ease-in',
            style: {
              height: '0',
            },
          },
          {
            duration: 180,
            timingFunction: 'ease-in',
            style: {
              opacity: '0',
            },
          },
        ],
      },
    ],
  }),
];

@Component({
  selector: 'mtk-sidebar-node',
  imports: [TranslatePipe, Ripple, IconComponent, CommonModule],
  templateUrl: './sidebar-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    button,
    button:focus {
      border: none;
    }
  `,
  animations,
})
export class SidebarNodeComponent {
  readonly node = input.required<SidebarNode>();
  readonly index = input.required<number>();
  readonly expandedNodes = input.required<SidebarNode[]>();
  readonly selectedNode = input.required<SidebarNode | null>();
  readonly listContainer = input.required<HTMLDivElement>();

  readonly nodesExpanded = output<SidebarNode[]>();

  private readonly router = inject(Router);
  private readonly elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef);
  readonly isSelected = computed(
    () => this.node().key === this.selectedNode()?.key,
  );
  readonly isExpanded = computed(() =>
    this.expandedNodes()?.some((node) => node.key === this.node().key),
  );

  constructor() {
    effect(() => {
      if (this.node().key === this.selectedNode()?.key) {
        requestAnimationFrame(() => {
          const listContainer = this.listContainer();
          const element = this.elementRef.nativeElement;

          const listContainerRect = listContainer.getBoundingClientRect();

          const listContainerHeight = listContainerRect.height;
          const elementTop = element.offsetTop;

          listContainer.scrollTo({
            top: elementTop - listContainerHeight / 2,
            behavior: 'smooth',
          });
        });
      }
    });
  }

  onNodeClick() {
    if (this.node().children) {
      if (this.isExpanded()) {
        const nodes = this.expandedNodes().filter(
          (node) => node.key !== this.node().key,
        );
        this.nodesExpanded.emit(nodes);
        return;
      }
      this.nodesExpanded.emit([...this.expandedNodes(), this.node()]);
      return;
    }
    const route = this.node().route;
    if (route) {
      this.router.navigateByUrl(`/${route}`).then();
    }
  }
}
