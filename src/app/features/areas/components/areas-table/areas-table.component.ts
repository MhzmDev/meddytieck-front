import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { ConfirmationDialogComponent } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { TablePageEvent } from 'primeng/table';
import { TableColumns } from '../../../../shared/components/table/models/table.model';
import { mtkTableModule } from '../../../../shared/components/table/table.module';
import { TranslationService } from '../../../../shared/services/translation/translation.service';
import { EditAreaComponent } from '../../dialogs/edit-area/edit-area.component';
import { Area } from '../../models/areas.model';
import { AreasStore } from '../../store/areas.store';

@Component({
  selector: 'mtk-areas-table',
  imports: [
    mtkTableModule,
    FormsModule,
    EditAreaComponent,
    ConfirmationDialogComponent,
    TranslatePipe,
  ],
  templateUrl: './areas-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreasTableComponent {
  private readonly translationService = inject(TranslationService);
  readonly areasStore = inject(AreasStore);

  constructor() {
    // Debug the areas data
    
    // Create an effect to log areas data whenever it changes
    effect(() => {
      const areas = this.areasStore.areas();
      if (Array.isArray(areas)) {
        if (areas.length > 0) {
        }
      }
    });
  }

  readonly showEditArea = signal(false);
  readonly selectedId = signal<number>(0);
  readonly rowVersion = signal<number>(0);

  readonly showConfirmDeleteArea = signal(false);
  readonly confirmDeleteAreaLoading = signal(false);

  readonly tableColumns = computed<TableColumns<Area>>(() => {
    return [
      {
        header: 'AREAS.AREA_NAME',
        field:
          this.translationService.currentLang() === 'ar' ? 'nameAr' : 'nameEn',
      },
    ];
  });

  readonly menuItems = computed(() => this.getMenuItems());
  readonly totalRecords = computed(() => {
    // Use the totalItems property from the store which is provided by withPagination
    return this.areasStore.totalItems();
  });

  getMenuItems(): MenuItem[] {
    return [
      {
        label: 'MENU_ITEMS.EDIT',
        icon: 'edit',
        id: 'edit',
        command: this.onRowMenuItemClick.bind(this),
      },
      {
        label: 'MENU_ITEMS.DELETE',
        icon: 'trash',
        id: 'delete',
        command: this.onRowMenuItemClick.bind(this),
      },
    ];
  }

  onPageChange(event: TablePageEvent): void {
    this.areasStore.setPage(
      event.first !== undefined ? Math.floor(event.first / event.rows) + 1 : 1,
    );
  }

  onRowMenuItemClick(event: MenuItemCommandEvent): void {
    const { item } = event;
    if (!item) return;

    const action = item.id;
    const id = item['rowData']?.id;
    const rowVersion = item['rowData']?.rowVersion;

    if (!id) return;

    if (action === 'edit') {
      this.selectedId.set(id);
      this.rowVersion.set(rowVersion);
      this.showEditArea.set(true);
    }

    if (action === 'delete') {
      this.selectedId.set(id);
      this.rowVersion.set(rowVersion);
      this.showConfirmDeleteArea.set(true);
    }
  }

  onDeleteArea() {
    this.showConfirmDeleteArea.set(true);
  }

  async onConfirmDeleteArea() {
    this.confirmDeleteAreaLoading.set(true);
    try {
      await this.areasStore.deleteArea(this.selectedId(), this.rowVersion());
      this.showConfirmDeleteArea.set(false);
    } finally {
      this.confirmDeleteAreaLoading.set(false);
    }
  }
}
