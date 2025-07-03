// Update the type definition to match the actual API response (which is an array of Suppliers)
export type GetSuppliersResponse = Supplier[];

export interface Supplier {
  id: number;
  nameEn: string;
  nameAr: string;
  phoneNumber: string;
  address?: string;
  isDeleted?: boolean;
  rowVersion?: string;
}

export interface CreateSupplierPayload {
  nameEn: string;
  nameAr: string;
  phoneNumber: string;
  address: string;
}

export interface UpdateSupplierPayload {
  id: number;
  nameEn: string;
  nameAr: string;
  phoneNumber: string;
  address: string;
  rowVersion?: string;
}
