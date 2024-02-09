import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { RegisterForm } from '../interfaces/auth.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);

  constructor(private firestore: Firestore) {}

  googleLogin(): Observable<UserCredential> {
    return from(signInWithPopup(this._auth, new GoogleAuthProvider()));
  }
  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this._auth, email, password));
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this._auth, email, password));
  }

  logOut() {
    return from(signOut(this._auth));
  }

  createUserDoc(user: any, preferences: RegisterForm) {
    const newDoc = setDoc(doc(this.firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: preferences.fullName,
      phoneNumber: preferences.phoneNumber,
      ci: preferences.ci,
    });
    return from(newDoc);
  }

  getUserPreferences(uid: string) {
    return from(getDoc(doc(this.firestore, 'users', uid)));
  }
}
