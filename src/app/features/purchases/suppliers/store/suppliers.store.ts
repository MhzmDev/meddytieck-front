import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import { SuppliersService } from '../services/suppliers.service';
import { CreateSupplierPayload, Supplier, UpdateSupplierPayload } from '../models/suppliers.model';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';

interface SuppliersState {
  suppliers: Supplier[];
  currentSupplier: Supplier | null;
  loading: boolean;
  error: string | null;
  createOrUpdateFulfilled: boolean;
}

const initialState: SuppliersState = {
  suppliers: [],
  currentSupplier: null,
  loading: false,
  error: null,
  createOrUpdateFulfilled: false,
};

@Injectable({
  providedIn: 'root',
})
export class SuppliersStore {
  readonly suppliersService = inject(SuppliersService);
  readonly toastService = inject(ToastService);
  readonly translateService = inject(TranslateService);
  
  // State management
  private state = new BehaviorSubject<SuppliersState>(initialState);
  private state$ = this.state.asObservable();
  
  // Signal-based state
  private _suppliers = signal<Supplier[]>([]);
  private _currentSupplier = signal<Supplier | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _currentPage = signal<number>(1);
  private _totalItems = signal<number>(0);
  private _createOrUpdateFulfilled = signal<boolean>(false);
  
  // Signal getters
  readonly suppliers = computed(() => this._suppliers());
  readonly supplier = computed(() => this._currentSupplier());
  readonly isSuppliersPending = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly currentPage = computed(() => this._currentPage());
  readonly totalItems = computed(() => this._totalItems());
  readonly isCreateOrUpdateFulfilled = computed(() => this._createOrUpdateFulfilled());
  readonly pageSize = signal<number>(10);
  readonly first = computed(() => (this._currentPage() - 1) * this.pageSize());
  
  // Legacy RxJS selectors
  readonly suppliers$ = this.state$.pipe(map(state => state.suppliers));
  readonly loading$ = this.state$.pipe(map(state => state.loading));
  readonly error$ = this.state$.pipe(map(state => state.error));
  
  constructor() {
    this.loadSuppliers();
  }
  
  // Helper method to update state
  private patchState(partialState: Partial<SuppliersState>): void {
    this.state.next({...this.state.value, ...partialState});
    
    // Update signals
    if (partialState.suppliers !== undefined) {
      this._suppliers.set(partialState.suppliers);
      this._totalItems.set(partialState.suppliers.length);
    }
    if (partialState.currentSupplier !== undefined) this._currentSupplier.set(partialState.currentSupplier);
    if (partialState.loading !== undefined) this._loading.set(partialState.loading);
    if (partialState.error !== undefined) this._error.set(partialState.error);
    if (partialState.createOrUpdateFulfilled !== undefined) this._createOrUpdateFulfilled.set(partialState.createOrUpdateFulfilled);
  }
  
  // Set page for pagination
  setPage(page: number): void {
    this._currentPage.set(page);
    this.loadSuppliers();
  }
  
  // Get a single supplier by ID
  getSupplierById(supplierId: number): void {
    if (!supplierId) return;
    
    this.patchState({ loading: true, error: null, createOrUpdateFulfilled: false });
    
    // First try to find in the current suppliers list
    const currentSuppliers = this._suppliers();
    const supplier = currentSuppliers.find(s => s.id === supplierId);
    
    if (supplier) {
      this.patchState({ currentSupplier: supplier, loading: false });
      return;
    }
    
    // If not found, reload suppliers and find again
    this.loadSuppliers();
  }
  
  // EFFECTS
  loadSuppliers(): void {
    this.patchState({ loading: true, error: null });
    
    this.suppliersService.getSuppliers().pipe(
      tap((suppliers: Supplier[]) => this.patchState({ suppliers, loading: false })),
      catchError((error: Error) => {
        this.patchState({ error: error.message, loading: false });
        this.toastService.error('SUPPLIERS.LOAD_ERROR');
        return of(null);
      })
    ).subscribe();
  }

  createSupplier(payload: CreateSupplierPayload): Observable<Supplier> {
    this.patchState({ loading: true, error: null });
    
    return this.suppliersService.createSupplier(payload).pipe(
      tap((supplier: Supplier) => {
        const currentSuppliers = this.state.value.suppliers;
        this.patchState({
          suppliers: [...currentSuppliers, supplier],
          loading: false
        });
        this.toastService.success('SUPPLIERS.CREATE_SUCCESS');
      }),
      catchError((error: Error) => {
        this.patchState({ error: error.message, loading: false });
        this.toastService.error('SUPPLIERS.CREATE_ERROR');
        throw error;
      }),
      finalize(() => this.patchState({ loading: false }))
    );
  }

  updateSupplier(payload: UpdateSupplierPayload): Observable<Supplier> {
    this.patchState({ loading: true, error: null });
    
    return this.suppliersService.updateSupplier(payload).pipe(
      tap((updatedSupplier: Supplier) => {
        const currentSuppliers = this.state.value.suppliers;
        const updatedSuppliers = currentSuppliers.map(supplier =>
          supplier.id === payload.id ? updatedSupplier : supplier
        );
        
        this.patchState({
          suppliers: updatedSuppliers,
          loading: false
        });
        
        this.toastService.success('SUPPLIERS.UPDATE_SUCCESS');
      }),
      catchError((error: Error) => {
        this.patchState({ error: error.message, loading: false });
        this.toastService.error('SUPPLIERS.UPDATE_ERROR');
        throw error;
      }),
      finalize(() => this.patchState({ loading: false }))
    );
  }

  deleteSupplier(supplierId: number): Observable<void> {
    this.patchState({ loading: true, error: null });
    
    return this.suppliersService.deleteSupplier(supplierId).pipe(
      tap(() => {
        // Remove the deleted supplier from the state
        const updatedSuppliers = this.state.value.suppliers.filter(
          supplier => supplier.id !== supplierId
        );
        this.patchState({ suppliers: updatedSuppliers, loading: false });
        this.toastService.success('SUPPLIERS.DELETE_SUCCESS');
      }),
      catchError(error => {
        this.patchState({
          loading: false,
          error: error.message || this.translateService.instant('SUPPLIERS.DELETE_ERROR')
        });
        this.toastService.error('SUPPLIERS.DELETE_ERROR');
        throw error;
      }),
      finalize(() => this.patchState({ loading: false }))
    );
  }
  

}
