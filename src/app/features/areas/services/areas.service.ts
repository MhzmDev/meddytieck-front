import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../core/constants/endpoints';
import {
  Area,
  CreateAreaPayload,
  GetAreasResponse,
  UpdateAreaPayload,
} from '../models/areas.model';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  private readonly http = inject(HttpClient);

  getAreas(params: any = {}) {
    return this.http.get<GetAreasResponse>(Endpoints.getAreas, {
      params,
    });
  }

  getAreaById(id: number) {
    return this.http.get<Area>(`${Endpoints.getAreaById}/${id}`);
  }

  createArea(data: CreateAreaPayload) {
    return this.http.post<Area>(Endpoints.createArea, data);
  }

  updateArea(data: UpdateAreaPayload) {
    return this.http.put<Area>(Endpoints.updateArea, data);
  }

  deleteArea(id: number, rowVersion: number) {
    let queryParams = {
      rowVersion: rowVersion,
    };
    return this.http.delete(`${Endpoints.deleteArea}/${id}`, {
      params: queryParams,
    });
  }
}
