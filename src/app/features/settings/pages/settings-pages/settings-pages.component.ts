import { Component } from '@angular/core';
import { PriceFormComponent } from '../../components/price-form/price-form.component';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import {
  Actions,
  Select,
  Store,
  ofActionCompleted,
  ofActionSuccessful,
} from '@ngxs/store';
import { GetSettings } from '../../state/setting.action';
import { Video, Settings } from '../../interfaces/settings.interface';
import { SettingsState } from '../../state/setting.state';
import { Observable, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

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
  @Select(SettingsState.settingsLoading) loading$!: Observable<void>;
  constructor(
    private actions: Actions,
    private store: Store,
    private settingsSvc: SettingsService
  ) {}

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
          console.log('Settings received 2:', settings);
          if (settings.tables) {
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
              url: Object.values(settings.videos.url).toString(),
            };
          }
        })
      )
      .subscribe(() => {
        console.log('Settings loaded');
        // this.store.selectSnapshot(SettingsState).pipe(
        //   tap((settings: any) => {
        //
        //     settings.forEach((setting: any) => {
        //       if (setting.rows && setting.columns) {
        //         this.tableData = {
        //           id: setting.id,
        //           rows: setting.rows,
        //           columns: setting.columns,
        //         };
        //       }
        //       if (setting.url) {
        //         this.videoData = {
        //           id: setting.id,
        //           url: setting.url,
        //         };
        //       }
        //     });
        //   })
        // );
      });
  }
}
