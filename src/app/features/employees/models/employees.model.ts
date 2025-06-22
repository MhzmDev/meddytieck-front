export interface GetEmployeesResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Employee[];
}

export interface Employee {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  firstNameAr: string;
  midNameAr: string;
  lastNameAr: string;
  firstNameEn: string;
  midNameEn: string;
  lastNameEn: string;
  displayNameAr: string;
  displayNameEn: string;
  fullAddress: string;
  identityNO: string;
  phoneNumber: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  active: boolean;
  token: string;
  joBTitle: string;
  departmentId: number;
  department: Department;
  areaId: number;
  area: Area;
  roles: string[];
  expiresOn: string; // ISO date string
  refreshToken: string;
  refreshTokenExpiration: string; // ISO date string
}

interface Department {
  id: number;
  code: number;
  nameAr: string;
  nameEn: string;
  active: boolean;
}

interface Area {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface CreateEmployeePayload {
  firstNameAr: string;
  midNameAr?: string;
  lastNameAr: string;
  firstNameEn: string;
  midNameEn?: string;
  lastNameEn: string;
  displayName: string;
  displayNameAr?: string;
  displayNameEn?: string;
  fullAddress?: string;
  identityNO: string;
  userName: string;
  email: string;
  phoneNumber: string;
  departmentId: number;
  joBTitle?: string;
  areaId: number;
}

export interface UpdateEmployeePayload {
  id: string;
  email?: string;
  phoneNumber?: string;
  fullAddress?: string;
  areaId?: number;
  joBTitle?: string;
}
