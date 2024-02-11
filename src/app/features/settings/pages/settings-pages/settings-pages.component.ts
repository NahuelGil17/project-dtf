import { Component } from '@angular/core';
import { PriceFormComponent } from '../../components/price-form/price-form.component';

@Component({
  selector: 'app-settings-pages',
  standalone: true,
  templateUrl: './settings-pages.component.html',
  styleUrl: './settings-pages.component.css',
  imports: [PriceFormComponent],
})
export class SettingsPagesComponent {}
