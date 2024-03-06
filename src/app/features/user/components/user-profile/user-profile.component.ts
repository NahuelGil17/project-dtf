import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Preferences } from '../../intefaces/preferences.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule],
})
export class UserProfileComponent {
  isEditing: boolean = false;
  profileForm: FormGroup;
  @Input() preferences: Preferences | null = null;
  nameFirstLetter: string = '';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: [''],
      email: [''],
      ci: [''],
      phoneNumber: [''],
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['preferences']) {
      this.nameFirstLetter = this.preferences?.fullName[0] || '';
    }
  }

  saveChanges() {
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }
}
