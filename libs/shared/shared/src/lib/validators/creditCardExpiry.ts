import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { creditCardExpiryRegex } from '../regex';
import { isValidDate } from '../type-guards';

/**
 * Return a validator function to verify that a credit expiry date is valid
 *
 * @returns The validator function
 */
export const creditCardExpiryValidator = (): ValidatorFn => (
  control: AbstractControl
): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  const invalidFormat: ValidationErrors = {
    creditCardExpiry: {
      valid: false,
      actual: control.value,
    },
  };
  const invalidDate: ValidationErrors = {
    creditCardExpiryDate: {
      valid: false,
      actual: control.value,
    },
  };

  if (creditCardExpiryRegex.test(control.value)) {
    const [expMonth, expYear] = control.value
      .split('/')
      .map((v) => parseInt(v, 10));
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = parseInt(
      new Date().getFullYear().toString().slice(2),
      10
    );
    if (expMonth < 1 || expMonth > 12) {
      return invalidDate;
    }
    if (
      expYear > currentYear ||
      (expYear === currentYear && expMonth >= currentMonth)
    ) {
      return null;
    } else {
      return invalidDate;
    }
  } else {
    return invalidFormat;
  }
};
