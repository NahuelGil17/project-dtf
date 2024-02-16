import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PriceTableService {
  private tableData: { columns: string[]; rows: string[][] } = {
    columns: [],
    rows: [],
  };

  constructor() {}

  setTableData(tableData: { columns: string[]; rows: string[][] }) {
    this.tableData = tableData;
  }

  getTableData() {
    return this.tableData;
  }
}
