import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Status } from './../../../shared/enums/status.enum';

@Pipe({
  name: 'orderStatus',
  standalone: true,
})
export class OrderStatusPipe implements PipeTransform {

  statusEnum = Status;


  constructor(private sanitizer: DomSanitizer) { }

  transform(value: number): SafeHtml {
    let statusText: string = '';
    let backgroundColor: string = '';
    let textColor: string = '';

    switch (value) {
      case this.statusEnum.INPROGRESS:
        statusText = 'EN PROCESO';
        backgroundColor = '#4CAF50';
        textColor = '#000000';
        break;
      case this.statusEnum.PENDING:
        statusText = 'PENDIENTE';
        backgroundColor = '#FFEB3B';
        textColor = '#000000';
        break;
      case this.statusEnum.CANCELLED:
        statusText = 'CANCELADO';
        backgroundColor = '#F44336';
        textColor = '#FFFFFF';
        break;
      case this.statusEnum.FINISHED:
        statusText = 'TERMINADO';
        backgroundColor = '#2196F3';
        textColor = '#FFFFFF';
        break;
      case this.statusEnum.DELIVERED:
        statusText = 'ENTREGADO';
        backgroundColor = '#03A9F4';
        textColor = '#FFFFFF';
        break;
      default:
        statusText = 'Desconocido';
        break;
    }
    return this.sanitizer.bypassSecurityTrustHtml(`
    <div style="
      background-color: ${backgroundColor};
      color: ${textColor};
      padding: 5px 10px;
      border-radius: 5px;
      display: inline-block;
      font-weight: bold;
    ">
      ${statusText}
    </div>
    `);
  }
}
