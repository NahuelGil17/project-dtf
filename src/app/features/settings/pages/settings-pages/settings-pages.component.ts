import { Component, OnInit } from '@angular/core';
import { PriceFormComponent } from '../../components/price-form/price-form.component';
import { SettingsService } from '../../services/settings.service';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { getSettings } from '../../state/setting.action';
import { Video } from '../../interfaces/settings.interface';

@Component({
  selector: 'app-settings-pages',
  standalone: true,
  templateUrl: './settings-pages.component.html',
  styleUrl: './settings-pages.component.css',
  imports: [PriceFormComponent, VideoFormComponent],
})
export class SettingsPagesComponent implements OnInit {
  tableData: { columns: string[]; rows: string[][]; id: string } = {
    id: '',
    columns: [],
    rows: [],
  };

  videoData: Video = {} as Video;
  constructor(private action: Actions, private store: Store) {}

  ngOnInit(): void {
    console.log('SettingsPagesComponent');
    this.getSetting();
  }

  getSetting() {
    this.store.dispatch(
      new getSettings({ table: this.tableData, url: this.videoData })
    );
    this.action
      .pipe(ofActionSuccessful(getSettings))
      .subscribe((settings: any) => {
        console.log('Settings received:', settings);
      });
  }
}
