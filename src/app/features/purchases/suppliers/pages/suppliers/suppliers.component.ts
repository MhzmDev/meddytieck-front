import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { SuppliersTableComponent } from '../../components/suppliers-table/suppliers-table.component';
import { SuppliersStore } from '../../store/suppliers.store';
import { CreateSupplierComponent } from '../../dialogs/create-supplier/create-supplier.component';
import { SuccessDialogComponent } from '../../../../../shared/components/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'mtk-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    ButtonModule,
    TranslateModule,
    SuppliersTableComponent,
    CreateSupplierComponent,
    SuccessDialogComponent
  ],
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent {
  @ViewChild(SuppliersTableComponent) suppliersTable?: SuppliersTableComponent;
  
  showCreateSupplier = signal(false);
  showSuccessDialog = signal(false);
  
  constructor(private suppliersStore: SuppliersStore) {}
  
  onSupplierCreated(): void {
    // Show success dialog
    this.showSuccessDialog.set(true);
    
    // Refresh the suppliers list
    if (this.suppliersTable) {
      this.suppliersTable.refreshSuppliers();
    }
  }
}
