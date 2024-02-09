import { Component, Input } from '@angular/core';
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
  sanitizedSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Usa DomSanitizer para sanear la URL al inicializar el componente
    this.sanitizedSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.video
    );
  }
}
