import { Component, Input } from '@angular/core';
import { ValueDolarPipe } from '../../../shared/pipes/value-dolar.pipe';

@Component({
  selector: 'app-table-price',
  standalone: true,
  templateUrl: './table-price.component.html',
  styleUrl: './table-price.component.css',
  imports: [ValueDolarPipe],
})
export class TablePriceComponent {
  @Input() table: { columns: string[]; rows: string[][] } = {
    columns: [],
    rows: [],
  };
}
