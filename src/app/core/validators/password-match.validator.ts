import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * Returns a validator function that checks if the password and confirm password fields match.
 * @returns {ValidatorFn} A validator function.
 */
export function passwordMatchValidator(): ValidatorFn {
  return (controls: AbstractControl): ValidationErrors | null => {
    const password = controls.get('password');
    const confirm = controls.get('confirmPassword');

    if (!!password?.value && !!confirm?.value) {
      if (password?.value !== confirm?.value) {
        confirm?.setErrors({
          invalidPassword: {
            message: 'Las contraseñas no coinciden',
          },
        });
      } else {
        return null;
      }
    }

    return null;
  };
}
