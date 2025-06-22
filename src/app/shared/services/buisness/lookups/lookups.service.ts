import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../../../core/constants/endpoints';
import {
  ActiveEnum,
  GetAreasResponse,
  GetDepartmentsResponse,
} from './lookups.model';

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  private http = inject(HttpClient);

  getAreas(active: ActiveEnum = ActiveEnum.All) {
    return this.http.get<GetAreasResponse>(Endpoints.getAreas, {
      params: { active },
    });
  }

  getDepartments() {
    return this.http.get<GetDepartmentsResponse>(Endpoints.getDepartments);
  }
}
