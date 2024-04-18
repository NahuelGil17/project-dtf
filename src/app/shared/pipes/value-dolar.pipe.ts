import { Pipe, PipeTransform } from '@angular/core';
import { GetSettings } from '../../features/settings/state/setting.action';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { tap } from 'rxjs';
import { SettingsState } from '../../features/settings/state/setting.state';

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
      value = (value * valueDolar).toString();
    }
    return value;
  }
}
