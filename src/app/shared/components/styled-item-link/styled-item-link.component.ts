import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mtk-styled-item-link',
  imports: [RouterModule],
  templateUrl: './styled-item-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyledItemLinkComponent {
  link = input.required<string | (string | number)[]>();
}
