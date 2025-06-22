export interface Area {
  id: number;
  nameAr: string;
  nameEn: string;
  active: boolean;
}

export type GetAreasResponse = Area[];

export interface Department {
  id: number;
  nameAr: string;
  nameEn: string;
  employeeStartingCode: number;
  code: number;
}

export type GetDepartmentsResponse = Department[];

export enum ActiveEnum {
  Inactive = 0,
  Active = 1,
  All = 3,
}
