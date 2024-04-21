import { Component, OnInit } from '@angular/core';
import { TablePriceComponent } from '../../../../core/components/table-price/table-price.component';
import { SettingsService } from '../../../settings/services/settings.service';
import { SettingsState } from '../../../settings/state/setting.state';
import { Observable } from 'rxjs';
import { Actions, Select, Store } from '@ngxs/store';
import { GetSettings } from '../../../settings/state/setting.action';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-price-page',
  standalone: true,
  templateUrl: './price-page.component.html',
  styleUrl: './price-page.component.css',
  imports: [TablePriceComponent, AsyncPipe],
})
export class PricePageComponent implements OnInit {
  tableData: { columns: string[]; rows: string[][] } = {
    columns: [],
    rows: [],
  };
  @Select(SettingsState.valueDolar) valueDolar$!: Observable<number>;

  constructor(
    private readonly actions: Actions,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
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
