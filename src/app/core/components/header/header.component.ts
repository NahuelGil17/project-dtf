import { Component, HostListener, SimpleChange, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { AuthState } from '../../../features/auth/state/auth.state';
import { Observable, Subscription, take, tap } from 'rxjs';
import { Logout } from '../../../features/auth/state/auth.actions';
import { CommonModule } from '@angular/common';
import { getUserPreferencesByUid } from '../../../features/user/state/user.actions';
import { UserState } from '../../../features/user/state/user.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  router = inject(Router);
  @Select(AuthState.isAuthenticated) isAuthenticated$!: Observable<boolean>;
  @Select(AuthState.isAdmin) isAdmin$!: Observable<boolean>;
  showMenu: boolean = false;
  selected: number = -1;
  userName: string = '';
  uid: string = '';
  auth: any;

  constructor(private store: Store, private actions: Actions) {}

  logOut() {
    this.store.dispatch(new Logout());
    this.actions.pipe(ofActionSuccessful(Logout), take(1)).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  ngOnInit() {
    this.auth = sessionStorage.getItem('auth');
    if (this.auth) {
      let authParse = JSON.parse(this.auth);
      if (authParse.preferences) {
        this.uid = authParse.preferences.uid;
      }
    }
    this.updateUserName();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    this.auth = sessionStorage.getItem('auth');
    if (changes['auth']) {
      this.updateUserName();
    }
  }

  updateUserName() {
    this.store.dispatch(new getUserPreferencesByUid(this.uid));
    this.actions
      .pipe(
        ofActionSuccessful(getUserPreferencesByUid),
        tap(() => {
          const userPreferences = this.store.selectSnapshot(UserState);
          this.userName = userPreferences.fullName[0];
        })
      )
      .subscribe(() => {});
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.showMenu && !(event.target.id.indexOf('user-menu') !== -1)) {
      this.showMenu = false;
    }
  }

  selectItem(index: number) {
    this.selected = index;
  }
}
