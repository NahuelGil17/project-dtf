import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Preferences } from '../../intefaces/preferences.interface';

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
  @Input() loading: boolean | null = false;
  @Output() profileFormValue: EventEmitter<Preferences> = new EventEmitter();
  nameFirstLetter: string = '';
  uid: string = '';

  constructor() {
    this.profileForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      ci: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['preferences']) {
      this.nameFirstLetter = this.preferences?.fullName[0] || '';
      this.uid = this.preferences?.uid || '';
      if (this.preferences) {
        this.profileForm.setValue({
          fullName: this.preferences?.fullName,
          email: this.preferences?.email,
          ci: this.preferences?.ci,
          phoneNumber: this.preferences?.phoneNumber,
        });
      }
    }
  }

  emitFormValues() {
    this.profileFormValue.emit(this.profileForm.value);
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
