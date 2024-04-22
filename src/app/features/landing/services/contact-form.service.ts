import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { exhaustMap, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  emailExample = {
    to: ['nicogilardonik@gmail.com'],
    message: {
      subject: 'Hello from Firebase!',
      text: 'This is the plaintext section of the email body.',
      html: 'This is the <code>HTML</code> section of the email body.',
    },
  };

  constructor(private fireStore: Firestore) {}

  async sendContactForm(name: string, email: string, message: string) {
    try {
      return from(
        addDoc(collection(this.fireStore, 'mail'), this.emailExample)
      );
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  saveOrder(order: any) {}
}
