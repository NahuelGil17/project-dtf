import { Component, OnInit } from '@angular/core';
import { PriceFormComponent } from '../../components/price-form/price-form.component';
import { SettingsService } from '../../services/settings.service';
import { VideoFormComponent } from '../../components/video-form/video-form.component';

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

  videoData: { url: string; id: string } = { url: '', id: '' };
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    const settings = this.settingsService
      .getSettings()
      .subscribe((settings) => {
        settings.map((setting: any) => {
          if (setting.rows && setting.columns) {
            this.tableData = {
              id: setting.id,
              columns: setting.columns,
              rows: setting.rows.map((row: any) => {
                const value = Object.values(row);
                return value;
              }),
            };
          }
          if (setting.url) {
            this.videoData = {
              id: setting.id,
              url: setting.url,
            };
          }
        });
      });
  }
}
