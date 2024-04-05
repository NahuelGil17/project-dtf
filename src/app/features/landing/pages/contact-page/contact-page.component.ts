import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
@Component({
  selector: 'app-contact-page',
  standalone: true,
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  imports: [ReactiveFormsModule, CommonModule, ContactFormComponent]
})

export class ContactPageComponent {
  handleContactForm($event: any) {
  }





}
