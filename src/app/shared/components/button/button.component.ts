import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Button, ButtonSeverity } from 'primeng/button';
import { TranslationService } from '../../services/translation/translation.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'mtk-button',
  imports: [Button, IconComponent, TranslateModule, CommonModule],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input<string>();
  icon = input<string>();
  piIcon = input<string>();
  piIconPosition = input<'start' | 'end'>('start');
  disabled = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });
  variant = input<'outlined' | 'text' | undefined>();
  size = input<'small' | 'large' | undefined>();
  severity = input<ButtonSeverity>('primary');
  style = input<Record<string, string>>({});
  styleClass = input<string>();
  rounded = input(false, { transform: booleanAttribute });
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClick = output<MouseEvent>();

  private readonly translationService = inject(TranslationService);
  get iconPosition() {
    if (this.translationService.currentLang() === 'ar') {
      return this.piIconPosition() === 'start' ? 'right' : 'left';
    }
    return this.piIconPosition() === 'start' ? 'left' : 'right';
  }
}
