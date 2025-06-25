import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { SuccessDialogComponent } from '../../../../shared/components/dialogs/success-dialog/success-dialog.component';
import { AreasStore } from '../../store/areas.store';
import { AreasTableComponent } from '../../components/areas-table/areas-table.component';
import { CreateAreaComponent } from '../../dialogs/create-area/create-area.component';

@Component({
  selector: 'mtk-areas',
  imports: [
    Card,
    Button,
    Divider,
    AreasTableComponent,
    TranslatePipe,
    CreateAreaComponent,
    SuccessDialogComponent,
  ],
  templateUrl: './areas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AreasStore],
})
export class AreasComponent {
  readonly showCreateArea = signal(false);
  readonly showSuccessDialog = signal(false);
}
