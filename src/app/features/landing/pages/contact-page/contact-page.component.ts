import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { SendContactForm } from '../../state/contact.actions';
import { ContactEmail } from '../../interfaces/contactemail.interface';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { ContactState } from '../../state/contact.state';
@Component({
  selector: 'app-contact-page',
  standalone: true,
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  imports: [ReactiveFormsModule, CommonModule, ContactFormComponent],
})
export class ContactPageComponent implements OnInit {
  @Select(ContactState.isLoading) loading$!: Observable<boolean>;
  resetForm: boolean = false;
  constructor(private store: Store, private actions: Actions) {}

  ngOnInit(): void {
    this.actions
      .pipe(
        ofActionSuccessful(SendContactForm),
        tap(() => {
          Swal.fire({
            title: 'Enviado!',
            text: 'Email enviado correctamente',
            icon: 'success',
          });
          this.resetForm = true;
        })
      )
      .subscribe(() => {});
  }
  handleContactForm(contactEmail: ContactEmail) {
    this.store.dispatch(new SendContactForm(contactEmail));
  }
}
