import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.model';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { UpdateUserPreferences, getUserPreferencesByUid } from './user.actions';
import { catchError, tap, throwError } from 'rxjs';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    loading: false,
    preferences: null,
  },
})
@Injectable({ providedIn: 'root' })
export class UserState {
  userService = inject(UserService);

  @Selector()
  static userLoading(state: UserStateModel): boolean | undefined {
    return state.loading;
  }

  @Action(UpdateUserPreferences, { cancelUncompleted: true })
  updateUserPreferences(
    ctx: StateContext<UserStateModel>,
    action: UpdateUserPreferences
  ) {
    ctx.patchState({ loading: true });
    const { uid, preferences } = action;
    return this.userService.updateUserPreferences(uid, preferences);
  }

  @Action(getUserPreferencesByUid, { cancelUncompleted: true })
  getUserPreferencesByUid(
    ctx: StateContext<UserStateModel>,
    action: getUserPreferencesByUid
  ) {
    ctx.patchState({ loading: true });
    return this.userService.getUserPreferences(action.uid).pipe(
      tap((doc) => {
        if (doc.exists()) {
          const preferences = doc.data();
          ctx.patchState(preferences);
          ctx.patchState({ loading: false });
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
