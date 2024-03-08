import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Preferences } from '../../intefaces/preferences.interface';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { UpdateUserPreferences } from '../../state/user.actions';

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
  uid: string = '';

  constructor(
    private fb: FormBuilder,
    private actions: Actions,
    private store: Store
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      ci: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.profileForm.get('email')?.disable();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['preferences']) {
      this.nameFirstLetter = this.preferences?.fullName[0] || '';
      this.uid = this.preferences?.uid || '';
      this.profileForm.patchValue({
        fullName: this.preferences?.fullName,
        email: this.preferences?.email,
        ci: this.preferences?.ci,
        phoneNumber: this.preferences?.phoneNumber,
      });
    }
  }

  saveChanges() {
    this.isEditing = false;
    if (this.profileForm.valid) {
      this.store.dispatch(
        new UpdateUserPreferences(this.uid, this.profileForm.value)
      );
      this.actions
        .pipe(ofActionSuccessful(UpdateUserPreferences))
        .subscribe(() => {
          this.profileForm.disable();
        });
    }
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
