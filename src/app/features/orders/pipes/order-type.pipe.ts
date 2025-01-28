import { Pipe, PipeTransform } from '@angular/core';
import { OrderType } from '../../../shared/enums/order-type.enum';

@Pipe({
  name: 'orderType',
  standalone: true,
})
export class OrderTypePipe implements PipeTransform {
  OrderType = OrderType;

  transform(value: any): string {
    switch (value) {
      case this.OrderType.DTF_TEXTIL:
        return 'DTF TEXTIL';
      case this.OrderType.DTF_UV:
        return 'DTF UV';
      default:
        return 'Desconocido';
    }
  }
}
