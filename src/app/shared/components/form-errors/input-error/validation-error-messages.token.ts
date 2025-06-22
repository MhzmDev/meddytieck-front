import { InjectionToken } from '@angular/core';

export const ERROR_MESSAGES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (args?: any) => { ar: string; en: string }
> = {
  required: () => ({ en: 'This field is required', ar: 'هذا الحقل مطلوب' }),
  email: () => ({
    en: 'It should be a valid email',
    ar: 'يجب أن يكون البريد الإلكتروني صحيح',
  }),
  notEmail: () => ({
    en: 'It should be a valid email',
    ar: 'يجب أن يكون البريد الإلكتروني صحيح',
  }),
  notPhone: () => ({ en: 'Phone is invalid', ar: 'هاتف غير صحيح' }),
  phoneShouldStartWith: () => ({
    en: 'Phone should start with +, ex: +20123456789',
    ar: 'هاتف يجب أن يبدأ بـ +, ex: +20123456789',
  }),
  minlength: ({ requiredLength }) => ({
    en: `The length should be at least ${requiredLength} characters`,
    ar: `يجب أن يكون الطول أكثر من ${requiredLength} حرف`,
  }),

  passwordShouldMatch: () => ({
    en: 'Password should match',
    ar: 'كلمة المرور غير متطابقة',
  }),
  pattern: () => ({ en: 'Wrong format', ar: 'صيغة غير صحيحة' }),
  notName: () => ({ en: 'Name is invalid', ar: 'اسم غير صحيح' }),
  notArAlphaNum: () => ({
    en: 'Name should be in Arabic',
    ar: 'الاسم يجب أن يكون بالعربية',
  }),
  notEnAlphaNum: () => ({
    en: 'Name should be in English',
    ar: 'الاسم يجب أن يكون بالانجليزية',
  }),
  notArabic: () => ({
    en: 'Name should be in Arabic',
    ar: 'الاسم يجب أن يكون بالعربية',
  }),
  notEnglish: () => ({
    en: 'Name should be in English',
    ar: 'الاسم يجب أن يكون بالانجليزية',
  }),
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(
  'Validation Messages',
  {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES,
  },
);
