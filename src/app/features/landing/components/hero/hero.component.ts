import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../core/components/button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
