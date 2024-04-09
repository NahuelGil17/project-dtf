import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderMode',
  standalone: true,
})
export class OrderModePipe implements PipeTransform {
  transform(value: any): any {
    if (value === 0) {
      return 'Entrega Normal';
    } else if (value === 1) {
      return 'Entrega Urgente';
    }
  }
}
