import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactFormService } from '../../services/contact-form.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnChanges {
  @Input() isLoading: boolean | null = false;
  @Input() resetForm: boolean = false;
  @Output() contactFormEmitter: EventEmitter<any> = new EventEmitter();

  public contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactFormService: ContactFormService
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.resetForm) {
      this.contactForm.reset();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.contactForm.valid) {
      this.contactFormEmitter.emit(this.contactForm.value);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
