export interface QuotaDetail {
  id: number;
  description: string;
  mtkQuotaId: number;
}

export interface Quota {
  id: number;
  nameAr: string;
  nameEn: string;
  advertismentsNoPerDay: number;
  productPeriorityTicketNo: number;
  monthPrice: number;
  monthPriceAfterDiscount: number;
  sixMonthPrice: number;
  sixMonthPriceAfterDiscount: number;
  yearPrice: number;
  yearPriceAfterDiscount: number;
  sysQoutaDetails: QuotaDetail[];
}

export interface QuotaState {
  quotas: Quota[];
  loading: boolean;
  error: string | null;
}
