import { Component } from '@angular/core';
import { VideoComponent } from '../../../../core/components/video/video.component';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { GetSettings } from '../../../settings/state/setting.action';
import { tap } from 'rxjs';
import { SettingsState } from '../../../settings/state/setting.state';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.css',
})
export class VideoSectionComponent {
  videoId: string = '';

  constructor(private actions: Actions, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetSettings());
    this.actions
      .pipe(
        ofActionSuccessful(GetSettings),
        tap(() => {
          const settings = this.store.selectSnapshot(SettingsState);
          if (settings.videos.url) {
            this.videoId = Object.values(settings.videos.url).toString();
            this.videoId = this.videoId.split('v=')[1];
            if (this.videoId.includes('&')) {
              this.videoId = this.videoId.split('&')[0];
            }
          }
        })
      )
      .subscribe(() => {});
  }
}
