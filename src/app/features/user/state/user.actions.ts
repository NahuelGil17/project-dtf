import { Preferences } from '../intefaces/preferences.interface';

export class getUserPreferencesByUid {
  static readonly type = '[User] Get User Preferences';
  constructor(public uid: string) {}
}

export class UpdateUserPreferences {
  static readonly type = '[User] Update User Preferences';
  constructor(public uid: string, public preferences: Preferences) {}
}
