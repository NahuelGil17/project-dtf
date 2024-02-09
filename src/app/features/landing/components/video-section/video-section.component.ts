import { Component } from '@angular/core';
import { VideoComponent } from '../../../../core/components/video/video.component';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './video-section.component.html',
  styleUrl: './video-section.component.css',
})
export class VideoSectionComponent {}
