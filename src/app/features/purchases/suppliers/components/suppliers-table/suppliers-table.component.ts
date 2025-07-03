import { Component, inject, OnInit, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SuppliersStore } from '../../store/suppliers.store';
import { Supplier } from '../../models/suppliers.model';
import { EditSupplierComponent } from '../../dialogs/edit-supplier/edit-supplier.component';
import { ConfirmationDialogComponent } from '../../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { TableColumns } from '../../../../../shared/components/table/models/table.model';
import { SuccessDialogComponent } from '../../../../../shared/components/dialogs/success-dialog/success-dialog.component';
import { TablePageEvent } from 'primeng/table';
import { mtkTableModule } from '../../../../../shared/components/table/table.module';
import { TranslationService } from '../../../../../shared/services/translation/translation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mtk-suppliers-table',
  standalone: true,
  imports: [
    mtkTableModule,
    FormsModule,
    EditSupplierComponent,
    ConfirmationDialogComponent,
    SuccessDialogComponent,
    TranslatePipe
  ],
  templateUrl: './suppliers-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuppliersTableComponent implements OnInit {
  private readonly translationService = inject(TranslationService);
  readonly suppliersStore = inject(SuppliersStore);
  
  readonly showEditSupplier = signal(false);
  readonly showConfirmDeleteSupplier = signal(false);
  readonly showSuccessDialog = signal(false);
  readonly selectedId = signal<number>(0);
  readonly confirmDeleteSupplierLoading = signal(false);

  readonly tableColumns = computed<TableColumns<Supplier>>(() => [
    { 
      field: this.translationService.currentLang() === 'ar' ? 'nameAr' : 'nameEn', 
      header: 'SUPPLIERS.NAME' 
    },
    { field: 'phoneNumber', header: 'SUPPLIERS.PHONE_NUMBER' }
  ]);

  readonly menuItems = computed(() => this.getMenuItems());
  
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

  ngOnInit(): void {
    this.refreshSuppliers();
  }

  refreshSuppliers(): void {
    this.suppliersStore.loadSuppliers();
  }

  onPageChange(event: TablePageEvent): void {
    this.suppliersStore.setPage(
      event.first !== undefined ? Math.floor(event.first / event.rows) + 1 : 1,
    );
  }

  onRowSelect(supplier: Supplier): void {
    this.selectedId.set(supplier.id);
  }
  
  onRowMenuItemClick(event: MenuItemCommandEvent): void {
    const { item } = event;
    if (!item) return;

    const action = item.id;
    switch (action) {
      case 'edit':
        this.showEditSupplier.set(true);
        break;
      case 'delete':
        this.showConfirmDeleteSupplier.set(true);
        break;
    }
  }

  onConfirmDeleteSupplier(): void {
    const supplierId = this.selectedId();
    if (supplierId) {
      this.confirmDeleteSupplierLoading.set(true);
      this.suppliersStore.deleteSupplier(supplierId).subscribe({
        next: () => {
          this.showConfirmDeleteSupplier.set(false);
          this.showSuccessDialog.set(true);
          this.confirmDeleteSupplierLoading.set(false);
        },
        error: () => {
          this.confirmDeleteSupplierLoading.set(false);
        }
      });
    }
  }
}
