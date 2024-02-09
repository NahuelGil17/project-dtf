import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  @Output() contactFormEmitter: EventEmitter<any> = new EventEmitter();

  public contactForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.contactForm.valid) {
      //hacer output para avisarle a este
      this.contactFormEmitter.emit(this.contactForm.value);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
