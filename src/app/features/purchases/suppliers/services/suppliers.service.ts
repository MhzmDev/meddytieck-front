import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateSupplierPayload, GetSuppliersResponse, Supplier, UpdateSupplierPayload } from '../models/suppliers.model';
import { Endpoints } from '../../../../core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private readonly http = inject(HttpClient);

  getSuppliers(): Observable<GetSuppliersResponse> {
    return this.http.get<GetSuppliersResponse>(Endpoints.getSuppliers);
  }

  createSupplier(payload: CreateSupplierPayload): Observable<Supplier> {
    return this.http.post<Supplier>(Endpoints.addSupplier, payload);
  }

  updateSupplier(payload: UpdateSupplierPayload): Observable<Supplier> {
    return this.http.put<Supplier>(`${Endpoints.updateSupplier}/${payload.id}`, payload);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${Endpoints.deleteSupplier}/${id}`);
  }
  getSupplierById(id: number): Observable<void> {
    return this.http.get<void>(`${Endpoints.getSupplierById}/${id}`);
  }
}
