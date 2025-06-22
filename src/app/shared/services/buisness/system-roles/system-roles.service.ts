import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../../../core/constants/endpoints';
import {
  GetSystemRolesResponse,
  UpdateUserRolesPayload,
} from './system-roles.model';
import { Employee } from '../../../../features/employees/models/employees.model';

@Injectable({
  providedIn: 'root',
})
export class SystemRolesService {
  private readonly http = inject(HttpClient);

  getSystemRoles() {
    return this.http.get<GetSystemRolesResponse>(Endpoints.getSystemRoles);
  }

  updateUserRoles(id: string, body: UpdateUserRolesPayload) {
    return this.http.put<Employee>(Endpoints.updateUserRoles(id), body, {});
  }
}
