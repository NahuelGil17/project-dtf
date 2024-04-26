import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SendContactForm } from '../../state/contact.actions';
import { ContactEmail } from '../../interfaces/contactemail.interface';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact-page',
  standalone: true,
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  imports: [ReactiveFormsModule, CommonModule, ContactFormComponent],
})
export class ContactPageComponent implements OnInit{
  constructor(private store: Store, private actions: Actions) {}

  ngOnInit(): void {
  
    this.actions
      .pipe(
        ofActionSuccessful(SendContactForm),
        tap(() => {
          debugger
          Swal.fire({
            title: 'Enviado!',
            text: 'Email enviado correctamente',
            icon: 'success',
          });
        })
      )
      .subscribe(() => {});


  }

  handleContactForm(contactEmail: ContactEmail) {  
    this.store.dispatch(new SendContactForm(contactEmail));
    
  }
}
