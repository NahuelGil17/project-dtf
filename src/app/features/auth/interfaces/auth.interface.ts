export interface RegisterForm {
  fullName: string;
  phoneNumber: string;
  ci: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
// TODO: Add the rest of the interfaces
export interface TokenResponse {
  idToken: string;
}
export interface UserPreferences {
  uid: string;
  isAdmin?: boolean;
}
