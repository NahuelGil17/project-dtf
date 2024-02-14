import { Component } from '@angular/core';
import { TablePriceComponent } from '../../../../core/components/table-price/table-price.component';
import { SettingsService } from '../../../settings/services/settings.service';

@Component({
  selector: 'app-price-page',
  standalone: true,
  templateUrl: './price-page.component.html',
  styleUrl: './price-page.component.css',
  imports: [TablePriceComponent],
})
export class PricePageComponent {
  tableData: { columns: string[]; rows: string[][]; id: string } = {
    id: '',
    columns: [],
    rows: [],
  };

  constructor(private settingsService: SettingsService) {
    this.settingsService.getSettings().subscribe((settings) => {
      settings.map((setting: any) => {
        if (setting.rows && setting.columns) {
          const newData = {
            id: setting.id,
            columns: setting.columns,
            rows: setting.rows.map((row: any) => {
              const value = Object.values(row);
              return value;
            }),
          };
          this.tableData = { ...newData };
        }
      });
    });
  }
}
