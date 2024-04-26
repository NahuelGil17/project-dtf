import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { Store } from '@ngxs/store';
import { SendContactForm } from '../../state/contact.actions';
import { ContactEmail } from '../../interfaces/contactemail.interface';
@Component({
  selector: 'app-contact-page',
  standalone: true,
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  imports: [ReactiveFormsModule, CommonModule, ContactFormComponent],
})
export class ContactPageComponent {
  constructor(private store: Store) {}

  handleContactForm(contactEmail: ContactEmail) {
    this.store.dispatch(new SendContactForm(contactEmail));
  }
}
