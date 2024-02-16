import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  addDoc,
  updateDoc,
  collectionData,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private firestore: Firestore) {}

  getSettings(): Observable<any> {
    const settingsCollection = collection(this.firestore, 'settings');
    return collectionData(settingsCollection, {
      idField: 'id',
    }) as Observable<any>;
  }

  createTable(tableData: { columns: string[]; rows: string[][] }) {
    const newDoc = collection(this.firestore, 'settings');
    const convertedRows = tableData.rows.map((row) => {
      return row.reduce((obj: { [key: string]: any }, cell, index) => {
        obj[index] = cell || '';
        return obj;
      }, {});
    });

    const data = {
      columns: tableData.columns,
      rows: convertedRows,
    };

    return from(addDoc(newDoc, data));
  }

  updateTable(
    tableId: string,
    tableData: { columns: string[]; rows: string[][] }
  ) {
    const tableRef = doc(this.firestore, 'settings', tableId);
    const convertedRows = tableData.rows.map((row) => {
      return row.reduce((obj: { [key: string]: any }, cell, index) => {
        obj[index] = cell || '';
        return obj;
      }, {});
    });

    const data = {
      columns: tableData.columns,
      rows: convertedRows,
    };

    return from(updateDoc(tableRef, data));
  }

  removeTable(tableId: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'settings', tableId)));
  }
}
