import { Pipe, PipeTransform } from '@angular/core';
import { OrderType } from '../../../shared/enums/order-type.enum';

@Pipe({
  name: 'orderType',
  standalone: true
})
export class OrderTypePipe implements PipeTransform {

  OrderType = OrderType;

  transform(value: number, ): string {

    switch (value) {
      case this.OrderType.PAPEL:
        return 'PAPEL';
      case this.OrderType.DTF:
        return 'DTF';
      case this.OrderType.TELA:
        return 'TELA';
      case this.OrderType.YZBEK:
        return 'YZBEK';
      case this.OrderType.DEPORTIVAS:
        return 'DEPORTIVAS';
      default:
        return 'Desconocido';
    }
    
  }

}
