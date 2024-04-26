import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { exhaustMap, from } from 'rxjs';
import { ContactEmail } from '../interfaces/contactemail.interface';
import { environment } from '../../../environment/environment.develop';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  emailExample = {
    to: ['a@gmail.com'],
    message: {
      subject: 'Hello from Firebase!',
      text: 'This is the plaintext section of the email body.',
      html: 'This is the <code>HTML</code> section of the email body.',
    },
  };

  constructor(private fireStore: Firestore) {}
   sendContactForm(contactEmail: ContactEmail){
    console.log('SERVICE: POR ENVIAR EL EMAIL');
    console.log(contactEmail);


    let email = {
      to: [`${environment.EMAIL}`],
      message: {
        subject: contactEmail.subject,
        text: contactEmail.message + '. CORREO: ' + contactEmail.email,
        html: contactEmail.message + '<br>' + 'CORREO: ' + contactEmail.email,
      },
    };

    return from(addDoc(collection(this.fireStore, 'email'), this.emailExample));
  }
}
