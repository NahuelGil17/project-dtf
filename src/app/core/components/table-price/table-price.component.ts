import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-price',
  standalone: true,
  imports: [],
  templateUrl: './table-price.component.html',
  styleUrl: './table-price.component.css',
})
export class TablePriceComponent {
  @Input() table: { columns: string[]; rows: string[][] } = {
    columns: [],
    rows: [],
  };
}
