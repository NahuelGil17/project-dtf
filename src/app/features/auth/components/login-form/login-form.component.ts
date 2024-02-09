import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  imports: [ButtonComponent, ReactiveFormsModule],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  @Input() isLoading: boolean | null = false;
  @Output() formValues: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  emitValues() {
    this.formValues.emit(this.loginForm.value);
  }
}
