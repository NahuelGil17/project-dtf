import { Component } from '@angular/core';
import { TablePriceComponent } from '../../../../core/components/table-price/table-price.component';
import { SettingsService } from '../../../settings/services/settings.service';

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

  constructor(private settingsService: SettingsService) {
    this.settingsService.getSettings().subscribe((settings) => {
      settings.map((setting: any) => {
        if (setting.rows && setting.columns) {
          const newData = {
            columns: setting.columns,
            rows: setting.rows.map((row: any) => {
              const value = Object.values(row);
              return value;
            }),
          };
          this.tableData = newData;
        }
      });
    });
  }
}
