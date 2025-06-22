export type UpdateUserRolesPayload = { roleKey: string; active: boolean }[];

export interface SystemRole {
  nameEn: string;
  nameAr: string;
  key: string;
}

export type GetSystemRolesResponse = SystemRole[];
