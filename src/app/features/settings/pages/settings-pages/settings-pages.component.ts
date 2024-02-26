import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { PriceFormComponent } from '../../components/price-form/price-form.component';
import { SettingsService } from '../../services/settings.service';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { GetSettings } from '../../state/setting.action';
import { Video, Table, Settings } from '../../interfaces/settings.interface';
import { SettingsState } from '../../state/setting.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings-pages',
  standalone: true,
  templateUrl: './settings-pages.component.html',
  styleUrl: './settings-pages.component.css',
  imports: [PriceFormComponent, VideoFormComponent],
})
export class SettingsPagesComponent {
  tableData: { columns: string[]; rows: string[][]; id: string } = {
    id: '',
    columns: [],
    rows: [],
  };

  videoData: Video = {} as Video;
  @Select(SettingsState) settings$!: Observable<Settings>;
  constructor(private actions: Actions, private store: Store) {
    this.store.dispatch(new GetSettings());
    this.store.select(SettingsState).subscribe((settings) => {
      if (!settings.loading) {
        if (settings.tables) {
          this.tableData = {
            id: settings.tables.id,
            columns: settings.tables.columns,
            rows: settings.tables.rows.map((row: any) => {
              const value = Object.values(row);
              return value;
            }),
          };
        }
        if (settings.videos) {
          this.videoData = {
            id: settings.videos.id,
            url: Object.values(settings.videos.url).toString(),
          };
        }
      }
    });
    console.log('Settings:', this.tableData, this.videoData);
  }
}
