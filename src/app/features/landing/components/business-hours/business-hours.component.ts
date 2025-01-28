import { Component } from '@angular/core';

@Component({
  selector: 'app-business-hours',
  standalone: true,
  imports: [],
  templateUrl: './business-hours.component.html',
  styleUrl: './business-hours.component.css',
})
export class BusinessHoursComponent {
  businessHours = [
    { day: 'Lunes', hours: '09:00 - 18:00' },
    { day: 'Martes', hours: '09:00 - 18:00' },
    { day: 'Miércoles', hours: '09:00 - 18:00' },
    { day: 'Jueves', hours: '09:00 - 18:00' },
    { day: 'Viernes', hours: '09:00 - 18:00' },
    { day: 'Sábado', hours: 'Cerrado' },
    { day: 'Domingo', hours: 'Cerrado' },
  ];
}
