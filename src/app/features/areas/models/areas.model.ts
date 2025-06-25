// Update the type definition to match the actual API response (which is an array of Areas)
export type GetAreasResponse = Area[];

export interface Area {
  id: number;
  nameAr: string;
  nameEn: string;
  isDeleted?: boolean;
}

export interface CreateAreaPayload {
  nameAr: string;
  nameEn: string;
}

export interface UpdateAreaPayload {
  id: number;
  nameAr: string;
  nameEn: string;
}
