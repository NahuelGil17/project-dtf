import { AbstractControl, ValidatorFn } from '@angular/forms';

export function adultAgeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null;  // Si no hay valor, no validamos
    }

    const currentDate = new Date();
    const minDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const selectedDate = new Date(control.value);

    return selectedDate <= minDate ? null : { 'notAdult': true };
  };
}