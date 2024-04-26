import { Injectable, inject } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';

import { ContactFormService } from '../services/contact-form.service';

import { OrdersStateModel } from './contact.model';

import { catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { SendContactForm } from './contact.actions';

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    loading: false,
  },
})
@Injectable({ providedIn: 'root' })
export class OrdersState {
  contactFormService = inject(ContactFormService);

  @Selector()
  static isLoading(state: OrdersStateModel): boolean | undefined {
    return state.loading;
  }

  @Action(SendContactForm, { cancelUncompleted: true })
  SendContactForm(ctx: any, action: SendContactForm) {
    console.log('STATE: POR ENVIAR EL EMAIL');
    ctx.patchState({ loading: true });
    return this.contactFormService
      .sendContactForm(action.contactEmail)
      .pipe(
        tap( () => {
          ctx.patchState({loading: false });
        }),
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al enviar la consulta',
            validationMessage: error,
            showConfirmButton: false,
            timer: 1500,
          });
          return throwError(() => new Error(error));
        })
      )
      .subscribe();
  }
  
}
