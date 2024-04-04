import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { CreateVideo, UpdateVideo } from '../../state/setting.action';
import { SnackBarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css',
})
export class VideoFormComponent {
  @Input() video: { url: string; id: string } = { url: '', id: '' };
  @Input() isLoading: boolean | null = false;
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
