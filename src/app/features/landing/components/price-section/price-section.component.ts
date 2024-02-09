import { Component } from '@angular/core';
import { TablePriceComponent } from '../../../../core/components/table-price/table-price.component';

@Component({
  selector: 'app-price-section',
  standalone: true,
  imports: [TablePriceComponent],
  templateUrl: './price-section.component.html',
  styleUrl: './price-section.component.css',
})
export class PriceSectionComponent {}
