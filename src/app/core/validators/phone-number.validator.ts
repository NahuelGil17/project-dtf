import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;
    const regex = /^0\d{2}\s?\d{3}\s?\d{3}$/;
    return regex.test(phone) ? null : { incompletePhone: true };
  };
}
