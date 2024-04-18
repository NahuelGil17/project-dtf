import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { PriceFormComponent } from '../../components/price-form/price-form.component';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import { Settings, Video } from '../../interfaces/settings.interface';
import { GetSettings } from '../../state/setting.action';
import { SettingsState } from '../../state/setting.state';

@Component({
  selector: 'app-settings-pages',
  standalone: true,
  templateUrl: './settings-pages.component.html',
  styleUrl: './settings-pages.component.css',
  imports: [PriceFormComponent, VideoFormComponent, CommonModule],
})
export class SettingsPagesComponent {
  tableData: { columns: string[]; rows: string[][]; id: string } = {
    id: '',
    columns: [],
    rows: [],
  };
  videoData: Video = {} as Video;
  valueDolar: {
    value: number;
    id: string;
  } = {
    value: 0,
    id: '',
  };
  @Select(SettingsState) settings$!: Observable<Settings>;

  constructor(private actions: Actions, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetSettings());
    this.getSettings();
  }

  getSettings() {
    this.actions
      .pipe(
        ofActionSuccessful(GetSettings),
        tap(() => {
          const settings = this.store.selectSnapshot(SettingsState);
          if (
            settings.tables &&
            settings.tables.rows &&
            settings.tables.columns
          ) {
            this.tableData = {
              id: settings.tables.id,
              rows: settings.tables.rows.map((row: any) => {
                const value = Object.values(row);
                return value;
              }),
              columns: settings.tables.columns,
            };
          }
          if (settings.videos) {
            this.videoData = {
              id: settings.videos.id,
              url: settings.videos.url,
            };
          }
          if (settings.valueDolar) {
            this.valueDolar = {
              value: settings.valueDolar.value,
              id: settings.valueDolar.id,
            };
          }
        })
      )
      .subscribe(() => {});
  }
}
