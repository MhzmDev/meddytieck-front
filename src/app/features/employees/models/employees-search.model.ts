import { SearchPagination } from '../../../shared/interfaces/search.model';

export interface EmployeesSearch {
  userName?: string;
  userEmail?: string;
  phoneNo?: string;
  departmentId?: number;
  areaId?: number;
  status?: number;
}

export type EmployeesSearchPagination = SearchPagination<EmployeesSearch>;
