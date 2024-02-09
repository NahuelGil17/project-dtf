import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Register } from '../../state/auth.actions';
import { AuthState } from '../../state/auth.state';

@Component({
  selector: 'app-register-page',
  standalone: true,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  imports: [
    RegisterFormComponent,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class RegisterPageComponent implements OnDestroy {
  router = inject(Router);
  @Select(AuthState.authLoading) loading$!: Observable<boolean>;
  private destroy = new Subject<void>();
  constructor(private actions: Actions, private store: Store) {}

  register(registerForm: any) {
    this.store.dispatch(new Register(registerForm));
    this.actions.pipe(ofActionSuccessful(Register)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
