import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, exhaustMap, tap, throwError } from 'rxjs';
import { UserPreferences } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { GetUserPreferences, Login, Logout, Register } from './auth.actions';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: null,
    loading: false,
    preferences: null,
  },
})
@Injectable({ providedIn: 'root' })
export class AuthState {
  authService = inject(AuthService);

  @Selector()
  static currentUserId(state: AuthStateModel): string | undefined {
    return state.preferences?.uid;
  }
  @Selector()
  static authLoading(state: AuthStateModel): boolean | undefined {
    return state.loading;
  }

  @Selector()
  static accessToken(state: AuthStateModel): string | undefined {
    return state.auth?.idToken;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.auth?.idToken;
  }

  @Selector()
  static isAdmin(state: AuthStateModel): boolean {
    return state.preferences?.isAdmin ?? false;
  }

  @Selector()
  static preferences(
    state: AuthStateModel
  ): UserPreferences | null | undefined {
    return state.preferences;
  }

  constructor(private toastService: ToastrService) {}

  @Action(Login, { cancelUncompleted: true })
  login(ctx: StateContext<AuthStateModel>, action: Login): Observable<void> {
    ctx.patchState({ loading: true });
    const { email, password } = action.payload;
    return this.authService.login(email, password).pipe(
      tap((auth: any) => {
        ctx.patchState({ auth: auth._tokenResponse, preferences: auth.user });
        ctx.patchState({ loading: false });
        this.toastService.success('Sesión iniciada con éxito');
      }),
      exhaustMap((auth: any) => {
        return ctx.dispatch(new GetUserPreferences(auth.user.uid));
      }),
      catchError((err: HttpErrorResponse) => {
        const errMessage = this.getErrorMessage(err);
        this.toastService.error(errMessage, 'Error al iniciar sesión');
        ctx.patchState({ loading: false });
        return throwError(() => err);
      })
    );
  }
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({
      auth: null,
      loading: false,
      preferences: null,
    });
    this.authService.logOut().pipe(
      tap(() => {
        sessionStorage.clear();
        localStorage.clear();
        // this.toastService.showToast('success', 'Sesión cerrada!');
      }),
      catchError((err: HttpErrorResponse) => {
        // this.toastService.showToast('danger', err.message);
        return throwError(() => err);
      })
    );
  }

  @Action(Register, { cancelUncompleted: true })
  register(
    ctx: StateContext<AuthStateModel>,
    action: Register
  ): Observable<void> {
    ctx.patchState({ loading: true });
    const { email, password } = action.payload;
    return this.authService.register(email, password).pipe(
      tap((auth: any) => {
        ctx.patchState({ loading: false });
        this.authService.createUserDoc(auth.user, action.payload);
        this.toastService.success('Usuario registrado con éxito');
      }),
      catchError((err: HttpErrorResponse) => {
        ctx.patchState({ loading: false });
        const errMessage = this.getErrorMessage(err);
        this.toastService.error(errMessage, 'Error al registrar usuario');
        return throwError(() => err);
      })
    );
  }

  @Action(GetUserPreferences, { cancelUncompleted: true })
  getUserPreferences(
    ctx: StateContext<AuthStateModel>,
    action: GetUserPreferences
  ): Observable<any> {
    ctx.patchState({ loading: true });
    return this.authService.getUserPreferences(action.uid).pipe(
      tap((preferences: any) => {
        ctx.patchState({ preferences: preferences.data() });
        ctx.patchState({ loading: false });
      }),
      catchError((err: HttpErrorResponse) => {
        ctx.patchState({ loading: false });
        const errMessage = this.getErrorMessage(err);
        this.toastService.error(errMessage, 'Error al obtener preferencias');
        return throwError(() => err);
      })
    );
  }

  getErrorMessage(error: any): string {
    let errorMessage = 'An unknown error occurred!';
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Este usuario ha sido deshabilitado.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido.';
          break;
        case 'auth/invalid-login-credentials':
          errorMessage = 'Credenciales invalidas.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Credenciales invalidas.';
          break;
      }
    }
    return errorMessage;
  }

  // @Action(GoogleLogin, { cancelUncompleted: true })
  // googleLogin(
  //   ctx: StateContext<AuthStateModel>,
  //   actions: GoogleLogin
  // ): Observable<void> {
  //   ctx.patchState({ loading: true });
  //   return this.authService.googleLogin().pipe(
  //     tap((auth: any) => {
  //       if (actions.isRegister) {
  //         // TODO: QUE hacer con la info del usuario si registro con google
  //         // this.authService.createUserDoc(auth.user);
  //       }
  //       ctx.patchState({ auth: auth._tokenResponse, preferences: auth.user });
  //     }),
  //     tap(() => {
  //       ctx.patchState({ loading: false });
  //     }),
  //     exhaustMap((auth: any) =>
  //       ctx.dispatch(new GetUserPreferences(auth.user.uid))
  //     ),
  //     catchError((err: HttpErrorResponse) => {
  //       ctx.patchState({ loading: false });
  //       const errMessage = this.getErrorMessage(err);
  //       // this.toastService.showToast('danger', errMessage);
  //       return throwError(() => err);
  //     })
  //   );
  // }

  // @Action(FacebookLogin, { cancelUncompleted: true })
  // facebookLogin(
  //   ctx: StateContext<AuthStateModel>,
  //   actions: FacebookLogin
  // ): Observable<void> {
  //   ctx.patchState({ loading: true });
  //   return this.authService.facebookLogin().pipe(
  //     tap((auth: any) => {
  //       if (actions.isRegister) {
  //         this.authService.createUserDoc(auth.user, true);
  //       }
  //       ctx.patchState({ auth: auth._tokenResponse, preferences: auth.user });
  //     }),
  //     tap(() => {
  //       ctx.patchState({ loading: false });
  //     }),
  //     exhaustMap((auth: any) =>
  //       ctx.dispatch(new GetUserPreferences(auth.user.uid))
  //     ),
  //     catchError((err: HttpErrorResponse) => {
  //       ctx.patchState({ loading: false });
  //       const errMessage = this.getErrorMessage(err);
  //       this.toastService.showToast('danger', errMessage);
  //       return throwError(() => err);
  //     })
  //   );
  // }
}
