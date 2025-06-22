import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

const TAG_COLORS = {
  green: {
    bg: '#E7F8F2',
    color: '#15BB84',
  },
  red: {
    bg: '#FDECEC',
    color: '#F15656',
  },
} as const;
@Component({
  selector: 'mtk-tag',
  imports: [TranslateModule],
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  readonly color = input.required<keyof typeof TAG_COLORS>();
  readonly text = input.required<string>();

  readonly bg = computed(() => TAG_COLORS[this.color()].bg);
  readonly textColor = computed(() => TAG_COLORS[this.color()].color);

  readonly TAG_COLORS = TAG_COLORS;
}
