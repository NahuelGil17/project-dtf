import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { MakeOrderComponent } from '../../components/make-order/make-order.component';
import { StepsComponent } from '../../components/steps/steps.component';
import { VideoSectionComponent } from '../../components/video-section/video-section.component';
import { PriceSectionComponent } from '../../components/price-section/price-section.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    MakeOrderComponent,
    StepsComponent,
    VideoSectionComponent,
    PriceSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
