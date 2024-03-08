import { Injectable } from '@angular/core';
import { Preferences } from '../intefaces/preferences.interface';
import { Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { doc } from '@firebase/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  getUserPreferences(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    return from(getDoc(userRef));
  }

  updateUserPreferences(uid: string, preferences: Preferences) {
    const userRef = doc(this.firestore, 'users', uid);
    const data = {
      email: preferences.email,
      fullName: preferences.fullName,
      phoneNumber: preferences.phoneNumber,
      ci: preferences.ci,
    };
    return from(updateDoc(userRef, data));
  }
}
