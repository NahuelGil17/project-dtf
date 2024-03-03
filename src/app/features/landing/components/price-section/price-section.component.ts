import { Component } from '@angular/core';
import { TablePriceComponent } from '../../../../core/components/table-price/table-price.component';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { GetSettings } from '../../../settings/state/setting.action';
import { tap } from 'rxjs';
import { SettingsState } from '../../../settings/state/setting.state';

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

  constructor(private store: Store, private actions: Actions) {}

  ngOnInit() {
    this.store.dispatch(new GetSettings());
    this.actions.subscribe(() => {
      const settings = this.store.selectSnapshot(SettingsState);
      if (settings.tables && settings.tables.columns && settings.tables.rows) {
        this.tableData = {
          rows: settings.tables.rows.map((row: any) => {
            const value = Object.values(row);
            return value;
          }),
          columns: settings.tables.columns,
        };
      }
    });
  }
}
