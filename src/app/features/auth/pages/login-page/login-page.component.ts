import { Component, inject, OnDestroy } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginForm } from '../../interfaces/auth.interface';
import { GetUserPreferences, Login } from '../../state/auth.actions';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Router, RouterModule } from '@angular/router';
import { AuthState } from '../../state/auth.state';
import { Observable, Subject, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private actions: Actions,
    private store: Store,
    private authSvc: AuthService
  ) {}

  login(loginForm: LoginForm) {
    console.log(loginForm);
    this.store.dispatch(new Login(loginForm));
    this.actions.pipe(ofActionSuccessful(Login)).subscribe((auth) => {
      // this.router.navigate(['/']);
      console.log('Login successful!');
    });
    // uEM8Ed34UlNLKbVnqcxug2ItTCt1
    // console.log('entre');
    // this.authSvc
    //   .getUserPreferences('uEM8Ed34UlNLKbVnqcxug2ItTCt1')
    //   .pipe(
    //     tap((doc) => {
    //       console.log(doc.data());
    //     })
    //   )
    //   .subscribe();
    // this.store.dispatch(new GetUserPreferences('uEM8Ed34UlNLKbVnqcxug2ItTCt1'));
    // this.actions
    //   .pipe(ofActionSuccessful(GetUserPreferences))
    //   .subscribe((doc) => {
    //     console.log(doc);
    //   });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
