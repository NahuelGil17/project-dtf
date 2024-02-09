import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from "./core/components/header/header.component";
import { FooterComponent } from "./core/components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'project-dtf';
  ngOnInit(): void {
    initFlowbite();
  }
}
