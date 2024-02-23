import { Action, State } from '@ngxs/store';
import { OrdersStateModel } from './orders.model';
import { Injectable, inject } from '@angular/core';
import { GetOrdersByUserId } from './orders.actions';
import { OrderService } from '../services/order.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    loading: false,
    orders: null,
    selectedOrder: null,
  },
})
@Injectable({ providedIn: 'root' })
export class OrdersState {
  orderService = inject(OrderService);
  toastService = inject(ToastrService);


  @Action(GetOrdersByUserId, { cancelUncompleted: true })
  getOrdersByUserId(ctx: any, action: GetOrdersByUserId) {
    ctx.patchState({ loading: true });
    this.orderService.getOrdersByUserId(action.userId).pipe(
      tap((orders) => {
        ctx.patchState({ orders, loading: false });
      },
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          this.toastService.error(error, 'Error al obtener las ordenes del usuario');
          return throwError(() => new Error(error));
        }))
    )
  }
}
