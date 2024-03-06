import { Preferences } from '../intefaces/preferences.interface';

export class UserStateModel {
  loading?: boolean;
  user?: Preferences | null;
  preferences?: Preferences | null;
}
