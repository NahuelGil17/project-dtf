import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'orderStatus',
  standalone: true,
})
export class OrderStatusPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml {
    let statusText: string = '';
    let backgroundColor: string = '';
    let textColor: string = '';

    switch (value) {
      case 'inprogress':
        statusText = 'EN PROCESO';
        backgroundColor = '#4CAF50';
        textColor = '#000000';
        break;
      case 'pending':
        statusText = 'PENDIENTE';
        backgroundColor = '#FFEB3B';
        textColor = '#000000';
        break;
      case 'canceled':
        statusText = 'CANCELADO';
        backgroundColor = '#F44336';
        textColor = '#FFFFFF';
        break;
      case 'finished':
        statusText = 'TERMINADO';
        backgroundColor = '#2196F3';
        textColor = '#FFFFFF';
        break;
      case 'delivered':
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
