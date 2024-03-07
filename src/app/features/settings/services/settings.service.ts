import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private firestore: Firestore) {}

  getSettings(): Observable<any> {
    const settingsCollection = collection(this.firestore, 'settings');
    return from(getDocs(settingsCollection)).pipe(
      map((snapshot: any) => {
        const settings: any = [];
        snapshot.forEach((doc: any) => {
          settings.push({ id: doc.id, ...doc.data() });
        });
        return settings;
      })
    );
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

  createVideo(urlInput: string) {
    const newDoc = collection(this.firestore, 'settings');
    const url = urlInput;

    return from(addDoc(newDoc, { url }));
  }

  updateVideo(videoId: string, url: string) {
    const videoRef = doc(this.firestore, 'settings', videoId);
    const data = {
      url,
    };

    return from(updateDoc(videoRef, data));
  }
}
