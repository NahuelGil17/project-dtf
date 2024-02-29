import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { AuthState } from '../../../features/auth/state/auth.state';
import { Observable, take } from 'rxjs';
import { Logout } from '../../../features/auth/state/auth.actions';
import { CommonModule } from '@angular/common';

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

  constructor(private store: Store, private actions: Actions) {}

  signOut() {
    this.store.dispatch(new Logout());
    this.actions.pipe(ofActionSuccessful(Logout), take(1)).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
