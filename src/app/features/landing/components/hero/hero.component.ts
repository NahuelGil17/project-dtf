import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
