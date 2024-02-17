import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css',
})
export class VideoFormComponent {
  videoForm!: FormGroup;
  @Input() video: { url: string; id: string } = { url: '', id: '' };
  url: string = '';
  constructor(
    private toastService: ToastrService,
    private settingsService: SettingsService
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
      this.url = Object.values(this.video.url).toString();
    }
    console.log(this.video.url);
  }

  saveVideo() {
    if (this.videoForm.valid) {
      try {
        // Save video
        if (!this.video.id) {
          this.settingsService.createVideo(this.videoForm.value);
        }
        // Update video
        else
          [
            this.settingsService.updateVideo(
              this.video.id,
              this.videoForm.value
            ),
          ];
        this.toastService.success('Video guardado');
      } catch (error) {
        this.toastService.error('Error al guardar el video');
        console.log(error);
      }
    }
  }
}
