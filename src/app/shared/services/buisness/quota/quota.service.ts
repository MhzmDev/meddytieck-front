import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../../../core/constants/endpoints';
import { Quota } from './quota.model';

@Injectable({
  providedIn: 'root',
})
export class QuotaService {
  private readonly http = inject(HttpClient);

  getAllQuotas(): Observable<Quota[]> {
    return this.http.get<Quota[]>(Endpoints.getAllQuotas);
  }
}
