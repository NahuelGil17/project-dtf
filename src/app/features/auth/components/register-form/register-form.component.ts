import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../../../core/validators/password-match.validator';
import { passwordValidator } from '../../../../core/validators/password.validator';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IMaskModule } from 'angular-imask';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  imports: [ReactiveFormsModule, ButtonComponent, IMaskModule],
})
export class RegisterFormComponent {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  cedulaMask = {
    mask: '0.000.000-0',
    lazy: false, // hace que la máscara sea visible incluso si el input está vacío
    blocks: {
      cedula: {
        mask: Number,
        thousandsSeparator: '.', // separador de miles
        radix: '-', // separador para el último dígito verificador
      },
    },
  };
  celularMask = {
    mask: '000 000 000',
    lazy: false, // hace que la máscara sea visible incluso si el input está vacío
    blocks: {
      celular: {
        mask: Number,
      },
    },
  };
  registerForm: FormGroup;
  @Input() isLoading: boolean | null = false;
  @Output() formValues: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.registerForm = new FormGroup(
      {
        fullName: new FormControl('', [Validators.required]),
        ci: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          passwordValidator(),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator() }
    );
  }

  phoneConverter(phoneNumber: string):string {
    let phone = phoneNumber.replace('0', '+598').replace(/\s/g, '');
    return phone;
  }

  emitFormValues() {
    if (this.registerForm.valid) {
      this.registerForm.value.phoneNumber = this.phoneConverter(this.registerForm.value.phoneNumber);
      this.formValues.emit(this.registerForm.value);
    } else {
      // Manejar la presentación de errores de validación
    }
  }
}
