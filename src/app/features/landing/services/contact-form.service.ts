import { Injectable } from '@angular/core';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Importamos las funciones de Firebase necesarias

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor() { }

  // Método para enviar el formulario de contacto
  async sendContactForm(name: string, email: string, message: string) {
    try {
      // Obtenemos una instancia de las funciones de Firebase
      const functions = getFunctions();

      // Creamos una referencia a la función HTTPS llamada "sendMail"
      const sendMail = httpsCallable(functions, 'sendMail');

      // Llamamos a la función HTTPS "sendMail" con los parámetros necesarios
      const result = await sendMail({ 
        to: 'nicogilardonik@gmail.com', 
        message: {
          subject: 'Nuevo mensaje de contacto',
          text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
        }
      });

      // Si el correo se envió con éxito, mostramos un mensaje en la consola
      console.log('Email sent successfully:', result);

      // Devolvemos el resultado (puede ser útil para manejar la respuesta en otros lugares)
      return result;
    } catch (error) {
      // Si ocurre un error al enviar el correo, lo mostramos en la consola y lanzamos una excepción
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
