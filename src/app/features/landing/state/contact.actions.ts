import { ContactEmail } from "../interfaces/contactemail.interface";


export class SendContactForm {
  static readonly type = '[Contact] Send Contact Form';
  constructor(public readonly contactEmail : ContactEmail) {
console.log('FORMULARIO EN ACTION');
  
  }
}

