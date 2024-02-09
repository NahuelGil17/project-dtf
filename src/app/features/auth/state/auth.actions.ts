import { LoginForm, RegisterForm } from '../interfaces/auth.interface';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public readonly payload: LoginForm) {}
}

export class GoogleLogin {
  static readonly type = '[Auth] GoogleLogin';
  constructor(public readonly isRegister: boolean) {}
}

export class FacebookLogin {
  static readonly type = '[Auth] FacebookLogin';
  constructor(public readonly isRegister: boolean) {}
}

export class ForgotPassword {
  static readonly type = '[Auth] Forgot Password';
  constructor(public readonly payload: { email: string }) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public readonly payload: RegisterForm) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class GetUserPreferences {
  static readonly type = '[Auth] Get User Preferences';
  constructor(public readonly uid: string) {}
}
