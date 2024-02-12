import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginForm } from '../../interfaces/auth.interface';
import { Login } from '../../state/auth.actions';
import { AuthState } from '../../state/auth.state';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  imports: [LoginFormComponent, CommonModule, RouterModule],
})
export class LoginPageComponent implements OnDestroy {
  router = inject(Router);
  @Select(AuthState.authLoading) loading$!: Observable<boolean>;
  private destroy = new Subject<void>();

  constructor(private actions: Actions, private store: Store) {}

  login(loginForm: LoginForm) {
    this.store.dispatch(new Login(loginForm));
    this.actions
      .pipe(ofActionSuccessful(Login), takeUntil(this.destroy))
      .subscribe((auth) => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
