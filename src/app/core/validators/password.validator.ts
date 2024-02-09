import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * Returns a validator function that checks if the password meets certain criteria.
 * @returns {ValidatorFn} A validator function.
 */
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value?.length < 8)
      return {
        invalidPassword: {
          message: 'La contraseña debe tener al menos 8 caracteres',
        },
      };

    if (!/\d/.test(value)) {
      return {
        invalidPassword: {
          message: 'La contraseña debe contener un número',
        },
      };
    }
    if (!/[a-z]/.test(value)) {
      return {
        invalidPassword: {
          message: 'La contraseña debe contener caracteres en minúsculas',
        },
      };
    }
    if (!/[A-Z]/.test(value)) {
      return {
        invalidPassword: {
          message: 'La contraseña debe contener caracteres en mayúsculas',
        },
      };
    }
    if (!/\W/.test(value)) {
      return {
        invalidPassword: {
          message: 'La contraseña debe contener caracteres especiales',
        },
      };
    }

    return null;
  };
}
