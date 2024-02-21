import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafePipe } from '../../pipes/safe/safe.pipe';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent {
  @Input() video: string = '';
  videoUrl: string = '';
  sanitizedSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.sanitizedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoUrl
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['video'] && this.video) {
      this.videoUrl = `https://www.youtube.com/embed/${this.video}`;
      console.log(this.videoUrl);
    }
  }
}
