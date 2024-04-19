import { Pipe, PipeTransform } from '@angular/core';
import { Actions, Store } from '@ngxs/store';

@Pipe({
  name: 'valueDolar',
  standalone: true,
})
export class ValueDolarPipe implements PipeTransform {
  constructor(private store: Store, private actions: Actions) {}
  transform(value: any, valueDolar: number): unknown {
    const originalValue = value;
    value = parseInt(value);
    if (isNaN(value)) {
      return originalValue;
    }

    if (typeof value === 'number') {
      value = `$ ${value * valueDolar}`;
    }
    return value;
  }
}
