import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHoursComponent } from '../../components/business-hours/business-hours.component';

@Component({
  selector: 'app-location-page',
  standalone: true,
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css'],
  imports: [CommonModule, BusinessHoursComponent],
})
export class LocationPageComponent {
  address = 'Domingo Aramburú 1847, Montevideo';
  phone = '+598 99 246 183';
  businessHours = [
    { day: 'Monday', hours: '09:00 - 18:00' },
    { day: 'Tuesday', hours: '09:00 - 18:00' },
    { day: 'Wednesday', hours: '09:00 - 18:00' },
    { day: 'Thursday', hours: '09:00 - 18:00' },
    { day: 'Friday', hours: '09:00 - 18:00' },
    { day: 'Saturday', hours: 'Closed' },
    { day: 'Sunday', hours: 'Closed' },
  ];
}
