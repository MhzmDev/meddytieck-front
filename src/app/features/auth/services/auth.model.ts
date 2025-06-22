export interface LoginBody {
  userNameEmail: string;
  userPass: string;
}

export interface Department {
  id: number;
  code: number;
  nameAr: string;
  nameEn: string;
  active: boolean;
}

export interface Area {
  id: number;
  nameAr: string;
  nameEn: string;
  isDeleted: boolean;
  rowVersion: number;
}

export interface SystemRole {
  nameAr: string;
  nameEn: string;
  key: string;
}

export interface RoleDetailData {
  nameAr: string;
  nameEn: string;
  key: string;
  active: boolean;
}

// Response format from API
export interface AuthResponse {
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
  displayNameAr: string | null;
  displayNameEn: string | null;
  fullAddress: string | null;
  identityNO: string | null;
  phoneNumber: string | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  active: boolean;
  isDeleted: boolean;
  token: string;
  joBTitle: string | null;
  departmentId: number;
  department: Department;
  areaId: number;
  area: Area;
  roles: string[];
  expiresOn: string; // ISO string, consider `Date` if parsed
  refreshToken: string;
  refreshTokenExpiration: string; // ISO string
  systemRoles: SystemRole[];
  rolesDetailData: RoleDetailData[];
  rowVersion: number;
}

// Alias for backward compatibility
export type LoginResponse = AuthResponse;

export interface RefreshResponse {
  email: string;
  expiresOn: string; // ISO 8601 UTC date string
  isAuthenticated: boolean;
  message: string | null;
  refreshToken: string;
  refreshTokenExpiration: string; // ISO 8601 format, might contain fractional seconds
  roles: string[];
  token: string;
  username: string;
}
