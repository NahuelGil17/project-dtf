import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { PriceFormComponent } from '../../components/price-form/price-form.component';
import { SettingsService } from '../../services/settings.service';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { GetSettings } from '../../state/setting.action';
import { Video, Table, Settings } from '../../interfaces/settings.interface';
import { SettingsState } from '../../state/setting.state';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  @Select(SettingsState) settings$!: Observable<Settings>;

  @Select(SettingsState.settingsloading) loading$!: Observable<void>;
  constructor(private actions: Actions, private store: Store) {}

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.store.dispatch(new GetSettings());
    // this.actions.pipe(ofActionSuccessful(GetSettings)).subscribe(() => {
    //   console.log('Settings loaded', this.settings$);
    // });
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
  }
}
