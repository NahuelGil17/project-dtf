import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import Swal from 'sweetalert2';
import { UpdateValueDolar, CreateValueDolar } from '../../state/setting.action';
import { NgClass, AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { Observable } from 'rxjs';
import { SettingsState } from '../../state/setting.state';

@Component({
  selector: 'app-dolar-form',
  templateUrl: './dolar-form.component.html',
  styleUrls: ['./dolar-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    NgClass,
    LoadingComponent,
    AsyncPipe,
  ],
})
export class DolarFormComponent implements OnInit, OnChanges {
  valueDolar!: FormGroup;
  @Input() valueDolarInput: { value: number; id: string } = {} as {
    value: number;
    id: string;
  };
  @Select(SettingsState.updateValueDolarLoading)
  valueDolarLoading$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private actions: Actions,
    private store: Store
  ) {}

  ngOnInit() {
    this.valueDolar = this.formBuilder.group({
      value: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.valueDolarInput.value > 0) {
      this.valueDolar.patchValue({
        value: this.valueDolarInput.value,
      });
    }
  }

  changeValueDolar() {
    if (this.valueDolar.valid) {
      if (this.valueDolarInput.id) {
        const valueData = {
          valueDolar: this.valueDolar.value.value,
          id: this.valueDolarInput.id,
        };
        console.log(
          '🚀 ~ DolarFormComponent ~ changeValueDolar ~ valueData:',
          valueData
        );

        this.store.dispatch(new UpdateValueDolar(valueData));
        this.actions
          .pipe(ofActionSuccessful(UpdateValueDolar))
          .subscribe(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Valor del dolar actualizado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else {
        const valueData = {
          value: this.valueDolar.value.value,
        };
        this.store.dispatch(new CreateValueDolar(valueData));
        this.actions
          .pipe(ofActionSuccessful(UpdateValueDolar))
          .subscribe(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Valor del dolar actualizado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    }
  }
}
