import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '../../../../core/constants/endpoints';
import { getDefinedValues } from '../../../utils/get-defined-values';
import { toFormData } from '../../../utils/to-form-data';
import { ActiveEnum } from '../lookups/lookups.model';
import {
  AddCategoryPayload,
  CategoriesWithPaginationSearchParams,
  CategoryItem,
  GetCategoriesResponse,
  GetCategoryByIdResponse,
  UpdateCategoryPayload,
} from './categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);

  getCategories(searchParams: CategoriesWithPaginationSearchParams) {
    return this.http.get<GetCategoriesResponse>(Endpoints.getCategories, {
      params: getDefinedValues({
        ...searchParams,
        Active: ActiveEnum.Active,
      }),
    });
  }

  getCategoryById(id: number) {
    return this.http.get<GetCategoryByIdResponse>(
      Endpoints.getCategoryById(id),
    );
  }

  addCategory(body: AddCategoryPayload) {
    return this.http.post<CategoryItem>(
      Endpoints.addCategory,
      toFormData(getDefinedValues(body)),
    );
  }

  updateCategory(body: UpdateCategoryPayload) {
    return this.http.put<CategoryItem>(
      Endpoints.updateCategory,
      toFormData(getDefinedValues(body)),
    );
  }

  deleteCategory(id: number) {
    return this.http.patch(Endpoints.deleteCategory(id), {});
  }
}
