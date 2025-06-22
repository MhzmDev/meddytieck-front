import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateEmployeePayload,
  Employee,
  GetEmployeesResponse,
  UpdateEmployeePayload,
} from '../models/employees.model';
import { Endpoints } from '../../../core/constants/endpoints';
import { EmployeesSearchPagination } from '../models/employees-search.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly http = inject(HttpClient);

  getEmployees(filter: EmployeesSearchPagination) {
    return this.http.get<GetEmployeesResponse>(Endpoints.getEmployees, {
      params: filter,
    });
  }

  addEmployee(data: CreateEmployeePayload) {
    return this.http.post<Employee>(Endpoints.addEmployee, data);
  }

  updateEmployee(data: UpdateEmployeePayload) {
    return this.http.put<Employee>(Endpoints.updateEmployee, data);
  }

  activateUser(id: string) {
    return this.http.put<Employee>(
      `${Endpoints.activateUser}`,
      {},
      {
        params: { Id: id },
      },
    );
  }

  deactivateUser(id: string) {
    return this.http.patch<Employee>(
      `${Endpoints.deactivateUser}`,
      {},
      {
        params: { Id: id },
      },
    );
  }

  getUserById(id: string) {
    return this.http.get<Employee>(`${Endpoints.getUserById(id)}`);
  }

  deleteUser(id: string) {
    return this.http.patch<Employee>(
      `${Endpoints.deleteUser}`,
      {},
      {
        params: { Id: id },
      },
    );
  }
}
