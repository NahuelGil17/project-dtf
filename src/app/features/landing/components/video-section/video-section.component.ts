import { Component } from '@angular/core';
import { VideoComponent } from '../../../../core/components/video/video.component';
import { SettingsService } from '../../../settings/services/settings.service';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.css',
})
export class VideoSectionComponent {
  videoId: string = '';

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings) => {
      settings.map((setting: any) => {
        if (setting.url) {
          this.videoId = Object.values(setting.url).toString();
          this.videoId = this.videoId.split('v=')[1];
          console.log(this.videoId);
        }
      });
    });
  }
}
