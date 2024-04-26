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
  constructor(private fireStore: Firestore) {}
   sendContactForm(contactEmail: ContactEmail){
    
    let email = {
      to: [`${environment.EMAIL}`],
      message: {
        subject: contactEmail.subject,
        text: contactEmail.message + '. CORREO: ' + contactEmail.email,
        html: contactEmail.message + '<br><br><br>' + 'CORREO: ' + contactEmail.email,
      },
    };

    return from(addDoc(collection(this.fireStore, 'email'), email));
  }
}
