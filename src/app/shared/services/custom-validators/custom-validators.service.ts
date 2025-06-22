import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import isAlpha from 'validator/es/lib/isAlpha';
import isAlphanumeric from 'validator/es/lib/isAlphanumeric';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import isNumeric from 'validator/es/lib/isNumeric';
import isURL from 'validator/es/lib/isURL';
import matches from 'validator/es/lib/matches';

export class CustomValidatorsService {
  /**
   * Validates whether the input control value is a valid email address using the
   *  validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object { notEmail: true } if the input value is not a valid email
   * address, or null if validation passes.
   */
  // Check If Input Contains Valid Email
  static isEmail(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !isEmail(value)) {
      return { notEmail: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value is a valid website URL using the
   * validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object { notWebsite: true } if the input value is not a valid website URL,
   *  or null if validation passes.
   */

  // Check If Input Contains Valid Website
  static isWebsite(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !isURL(value)) {
      return { notWebsite: true };
    }
    return null;
  }

  /**
   * Creates a validator function that checks whether the input control value matches the
   * specified regular expression using the validator.js library.
   *
   * @param regex The regular expression to match against.
   * @returns A validator function that checks whether the input control value matches the
   *  specified regular expression.
   */
  // Check If Input Match Regex
  static isMatchRegex(regex: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const value = control.value as string;
      if (value && !matches(value, regex)) {
        return { notMatchRegex: true };
      }
      return null;
    };
  }

  /**
   * Validates whether the input control value contains only numeric characters using the
   *  validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object{ notNumber: true } if the input value contains non-numeric characters,
   * or null if validation passes.
   */
  // Check If Input Contains Numbers Only
  static isNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim().toString();
    if (value && !isNumeric(value, { no_symbols: true })) {
      return { notNumber: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value contains only English characters using the
   * validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object  { notEnglish: true } if the input value contains non-English characters,
   *  or null if validation passes.
   */
  // Check If Input Contains English Characters Only

  static isEnglish(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValid = value
      .split('')
      .every(
        (word) =>
          isAlpha(word, 'en-US') ||
          isNumeric(word, { no_symbols: false }) ||
          word === ' ',
      );
    if (value && !isValid) {
      return { notEnglish: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value contains only Arabic characters using the
   *  validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object  { notArabic: true } if the input value contains non-Arabic
   *  characters, or null if validation passes.
   */

  // Check If Input Contains Arabic Characters Only
  static isArabic(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValid = value
      .split('')
      .every(
        (word) =>
          isAlpha(word, 'ar-EG') ||
          isNumeric(word, { no_symbols: false }) ||
          word === ' ',
      );
    if (value && !isValid) {
      return { notArabic: true };
    }
    return null;
  }

  static isName(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;

    const isValid = isAlpha(value, 'ar-EG') || isAlpha(value, 'en-US');
    if (value && !isValid) {
      return { notName: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value contains only Arabic or English characters and
   * numbers using the validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object { notAlphabet: true } if the input value contains non-Arabic and non-English
   * characters, or null if validation passes.
   */

  // Check If Input Contains Arabic OR English Characters Only
  static isAlphabet(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValidAlphabetEn = value
      .split(' ')
      .every((word) => isAlpha(word, 'en-US'));
    const isValidAlphabetAr = value
      .split(' ')
      .every((word) => isAlpha(word, 'ar-EG'));
    if (value && !isValidAlphabetEn && !isValidAlphabetAr) {
      return { notAlphabet: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value contains only Arabic or English characters and
   * numbers using the validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object{ notAlphaNum: true } if the input value contains
   *  non-Arabic and non-English
   *  characters, or null if validation passes.
   */

  // Check If Input Contains Arabic OR English Characters And Numbers Only
  static isAlphanumeric(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValidAlphanumericEn = value
      .split(' ')
      .every((word) => isAlphanumeric(word, 'en-US'));
    const isValidAlphanumericAr = value
      .split(' ')
      .every((word) => isAlphanumeric(word, 'ar-EG'));
    if (value && !isValidAlphanumericEn && !isValidAlphanumericAr) {
      return { notAlphaNum: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value contains only Arabic characters and numbers using
   * the validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object { notArAlphaNum: true } if the input value contains
   *  non-Arabic characters or non-numeric characters, or null if validation passes.
   */

  // Check If Input Contains Arabic Characters And Numbers Only
  static isArabicAlphanumeric(
    control: AbstractControl,
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValidAlphanumericAr = value
      .replaceAll('\n', ' ')
      .replaceAll('\r', ' ')
      .split(' ')
      .every((word) => isAlphanumeric(word, 'ar-EG'));
    if (value && !isValidAlphanumericAr) {
      return { notArAlphaNum: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value contains only English characters and numbers
   *  using the validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object { notEnAlphaNum: true } if the input value contains
   *  non-English characters or
   *  non-numeric characters, or null if validation passes.
   */

  // Check If Input Contains English Characters And Numbers Only
  static isEnglishAlphanumeric(
    control: AbstractControl,
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value
      .trim()
      .replaceAll('\n', ' ')
      .replaceAll('\r', ' ');
    const isValidAlphanumericEn = isAlphanumeric(value, 'en-US', {
      ignore: new RegExp('[^\\w\\s]', 'g'),
    });

    if (value && !isValidAlphanumericEn) {
      return { notEnAlphaNum: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value is a valid date string in the format
   *  yyyy-MM-ddTHH:mm:ss using the validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object if the input value is not a valid date string in the
   *  specified format, or null if validation passes.
   */

  // Check If Input Contains Valid Date Format
  static isDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const dateRegex = '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})$';
    const value = control.value.trim() as string;
    if (value && !matches(value, dateRegex)) {
      return { notDate: true };
    }
    return null;
  }

  /**
   * Validates whether the input control value is a valid mobile phone number in the format
   *  +20xxxxxxxxxx using the validator.js library.
   *
   * @param control The input control to validate.
   * @returns A validation error object { notPhone: true } if the input value is not a valid mobile phone number,
   *  or null if validation passes.
   */

  // Check If Input Contains Valid Mobile Number
  static isPhone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !isMobilePhone(value, 'any', { strictMode: false })) {
      return { notPhone: true };
    }
    return null;
  }

  static isPhoneWithCode(phoneName = 'phone', codeName = 'code'): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      if (!control.value) {
        return null;
      }

      const phone = control.value[phoneName]?.trim();
      const code = control.value[codeName]?.trim();
      if (
        phone &&
        code &&
        !isMobilePhone(code + phone, 'any', { strictMode: true })
      ) {
        (control as FormGroup).controls[phoneName].setErrors({
          notPhone: true,
        });
        return { notPhone: true };
      }
      const errors = (control as FormGroup).controls[phoneName].errors;
      delete errors?.['notPhone'];
      (control as FormGroup).controls[phoneName].setErrors(
        Object.keys(errors || {}).length ? { ...errors } : null,
      );

      return null;
    };
  }

  // Check If Input Contains Valid URL
  static isURL(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !isURL(value)) {
      return { notURL: true };
    }
    return null;
  }
}
