import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../services/settings.service';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { CreateVideo } from '../../state/setting.action';

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
    private toastService: ToastrService,
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
      this.store.dispatch(new CreateVideo(this.videoForm.value));
      this.actions.pipe(ofActionSuccessful(CreateVideo)).subscribe(() => {
        this.toastService.success('Video saved');
      });
    }
  }
}
