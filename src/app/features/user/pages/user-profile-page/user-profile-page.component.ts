import { Component } from '@angular/core';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { AuthState } from '../../../auth/state/auth.state';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { Preferences } from '../../intefaces/preferences.interface';
import { getUserPreferencesByUid } from '../../state/user.actions';
import { tap } from 'rxjs';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
  imports: [UserProfileComponent],
})
export class UserProfilePageComponent {
  preferences: Preferences | null = null;
  uid: string = '';
  constructor(private store: Store, private actions: Actions) {}

  ngOnInit() {
    let auth = sessionStorage.getItem('auth');
    if (auth) {
      this.uid = JSON.parse(auth).preferences.uid;
    }
    this.getPreferences();
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

  editUserPreferences() {}
}
