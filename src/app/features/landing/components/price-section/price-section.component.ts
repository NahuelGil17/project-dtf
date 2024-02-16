import { Component } from '@angular/core';
import { TablePriceComponent } from '../../../../core/components/table-price/table-price.component';
import { PriceTableService } from '../../../settings/services/price-table.service';

@Component({
  selector: 'app-price-section',
  standalone: true,
  imports: [TablePriceComponent],
  templateUrl: './price-section.component.html',
  styleUrl: './price-section.component.css',
})
export class PriceSectionComponent {
  tableData: { columns: string[]; rows: string[][] } = {
    columns: [],
    rows: [],
  };

  constructor(private priceTableService: PriceTableService) {
    this.tableData = this.priceTableService.getTableData();
  }
}
