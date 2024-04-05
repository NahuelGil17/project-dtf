import { Pipe, PipeTransform } from '@angular/core';
import { OrderType } from '../enums/order-type.enum';
@Pipe({
  name: 'order-type'
})
export class OrderTypePipe implements PipeTransform {

  transform(value: OrderType): any {
    switch (value) {
      case OrderType.PAPEL:
        return 'Papel';
      case OrderType.DTF:
        return 'DTF';
      case OrderType.TELA:
        return 'Tela';
      case OrderType.YZBEK:
        return 'Yzbek';
      case OrderType.DEPORTIVAS:
        return 'Deportivas';
      default:
        return '';
    }
  }

}
