import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { onlyLettersRegex } from '../regex';

/**
 * Return a validator function to verify that an email address is valid
 *
 * @returns The validator function
 */
export const lettersValidator = (): ValidatorFn => (
  control: AbstractControl
): ValidationErrors | null => {
  // Allow optional controls by not validating empty values
  if (!control || !control.value) {
    return null;
  }

  const invalidResponse: ValidationErrors = {
    letters: {
      valid: false,
      actual: control.value,
    },
  };

  return onlyLettersRegex.test(control.value) ? null : invalidResponse;
};
