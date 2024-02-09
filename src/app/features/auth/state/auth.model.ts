import { TokenResponse, UserPreferences } from '../interfaces/auth.interface';

export class AuthStateModel {
  loading?: boolean;
  auth?: TokenResponse | null;
  preferences?: UserPreferences | null;
}
