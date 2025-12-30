import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ImageModalComponent } from './shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ImageModalComponent
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'project-dtf';
  @ViewChild(ImageModalComponent) imageModal!: ImageModalComponent;

  ngOnInit(): void {
    initFlowbite();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.imageModal) {
        this.imageModal.open();
      }
    }, 1000);
  }
}
