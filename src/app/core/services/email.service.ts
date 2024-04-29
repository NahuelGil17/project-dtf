import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private fireStore: Firestore) {}

  sendEmail(to: string, subject: string, message: string) {
    let email = {
      to: [to],
      message: {
        subject: subject,
        text: message,
        html: message,
      },
    };

    return from(addDoc(collection(this.fireStore, 'email'), email));
  }
}
