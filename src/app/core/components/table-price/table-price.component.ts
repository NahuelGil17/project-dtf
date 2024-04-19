import { Component, Input } from '@angular/core';
import { ValueDolarPipe } from '../../../shared/pipes/value-dolar.pipe';
import { CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-table-price',
  standalone: true,
  templateUrl: './table-price.component.html',
  styleUrl: './table-price.component.css',
  imports: [ValueDolarPipe, JsonPipe, CurrencyPipe],
})
export class TablePriceComponent {
  @Input() table: { columns: string[]; rows: string[][] } = {
    columns: [],
    rows: [],
  };
  @Input() valueDolar!: number | null;
}
