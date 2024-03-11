import { Component } from '@angular/core';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { AuthState } from '../../../auth/state/auth.state';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { Preferences } from '../../intefaces/preferences.interface';
import {
  UpdateUserPreferences,
  getUserPreferencesByUid,
} from '../../state/user.actions';
import { Observable, tap } from 'rxjs';
import { UserState } from '../../state/user.state';
import { UserPreferences } from '../../../auth/interfaces/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
  imports: [UserProfileComponent, CommonModule],
})
export class UserProfilePageComponent {
  @Select(AuthState.preferences) preferences$!: Observable<UserPreferences>;
  @Select(UserState.userLoading) loading$!: Observable<boolean>;
  preferences: Preferences | null = null;
  uid: string = '';
  constructor(private store: Store, private actions: Actions) {}

  ngOnInit() {
    this.preferences$.subscribe((preferences) => {
      if (preferences) {
        this.uid = preferences.uid;
        this.getPreferences();
      }
    });
  }

  getPreferences() {
    this.store.dispatch(new getUserPreferencesByUid(this.uid));
    this.actions
      .pipe(
        ofActionSuccessful(getUserPreferencesByUid),
        tap(() => {
          const userPreferences = this.store.selectSnapshot(UserState);
          this.preferences = userPreferences;
        })
      )
      .subscribe(() => {});
  }

  saveChanges(preferences: Preferences) {
    this.store.dispatch(new UpdateUserPreferences(this.uid, preferences));
    this.actions
      .pipe(ofActionSuccessful(UpdateUserPreferences))
      .subscribe(() => {
        this.getPreferences();
      });
  }
}
