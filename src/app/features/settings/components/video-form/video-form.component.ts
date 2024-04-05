import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { CreateVideo, UpdateVideo } from '../../state/setting.action';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Observable } from 'rxjs';
import { SettingsState } from '../../state/setting.state';
import { AsyncPipe } from '@angular/common';
import { SnackBarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-video-form',
  standalone: true,
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css',
  imports: [ReactiveFormsModule, ButtonComponent, AsyncPipe],
})
export class VideoFormComponent {
  @Input() video: { url: string; id: string } = { url: '', id: '' };
  @Select(SettingsState.settingsLoading) loading$!: Observable<boolean>;
  videoForm!: FormGroup;
  url: string = '';
  constructor(
    private snackbarService: SnackBarService,
    private actions: Actions,
    private store: Store
  ) {
    this.videoForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['video'] && this.video.url) {
      this.videoForm.patchValue({
        url: this.video.url,
      });
      this.url = this.video.url;
    }
  }

  saveVideo() {
    if (this.videoForm.valid) {
      if (!this.video.id) {
        this.store.dispatch(new CreateVideo(this.videoForm.value));
        this.actions.pipe(ofActionSuccessful(CreateVideo)).subscribe(() => {
          this.snackbarService.showSuccess('', 'Video saved');
        });
      } else {
        const videoData = {
          videoId: this.video.id,
          url: this.videoForm.value.url,
        };

        this.store.dispatch(new UpdateVideo(videoData));
        this.actions.pipe(ofActionSuccessful(UpdateVideo)).subscribe(() => {
          this.snackbarService.showSuccess('', 'Video updated');
        });
      }
    }
  }
}
