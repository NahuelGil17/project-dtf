import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Preferences } from '../../intefaces/preferences.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  imports: [ButtonComponent, CommonModule],
})
export class UserProfileComponent {
  @Input() preferences: Preferences | null = null;
  nameFirstLetter: string = '';

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['preferences']) {
      this.nameFirstLetter = this.preferences?.fullName[0] || '';
    }
  }
}
