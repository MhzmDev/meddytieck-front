import { ActiveEnum } from '../lookups/lookups.model';

export interface AddCategoryPayload {
  nameEn: string;
  nameAr: string;
  parentCategoryId: number | null;
  imageFile: File | null;
}

export interface UpdateCategoryPayload extends AddCategoryPayload {
  id: number;
  image: string | null;
}

export interface CategoryItem {
  id: number;
  nameAr: string;
  nameEn: string;
  parentCategoryId: number;
  parentCategory: {
    id: number;
    nameAr: string;
    nameEn: string;
    parentCategoryId: number;
    parentCategory: string;
    childCategories: string[];
    image: string;
    active: boolean;
  };
  active: boolean;
  image: string;
  imageFulUrl: string;
}

export interface GetCategoriesResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: CategoryItem[];
}

export type GetCategoryByIdResponse = CategoryItem;

export interface CategoriesSearchParams {
  Active?: ActiveEnum;
  ParentId?: number | null;
  Sort?: string;
  Name?: string;
}

export interface CategoriesWithPaginationSearchParams
  extends CategoriesSearchParams {
  PageIndex: number;
  PageSize: number;
}
