import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';
import { IconComponent } from '../../icon/icon.component';
@Component({
  selector: 'mtk-success-dialog',
  imports: [Dialog, IconComponent, TranslateModule],
  templateUrl: './success-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessDialogComponent {
  visible = model.required<boolean>();
  icon = input<string>('success-check');
  title = input<string>('DIALOG.SAVED_SUCCESSFULLY');
}
