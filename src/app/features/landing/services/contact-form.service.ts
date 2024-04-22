import { Injectable } from '@angular/core';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Importamos las funciones de Firebase necesarias

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor() { }

  async sendContactForm(name: string, email: string, message: string) {
    try {
      const functions = getFunctions();

      const sendMail = httpsCallable(functions, 'sendMail');

      const result = await sendMail({ 
        to: 'nicogilardonik@gmail.com', 
        message: {
          subject: 'Nuevo mensaje de contacto',
          text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
        }
      });

      console.log('Email sent successfully:', result);

      return result;
    } catch (error) {

      console.error('Error sending email:', error);
      throw error;
    }
  }
}
