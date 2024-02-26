import { Action, Selector, State } from '@ngxs/store';
import { OrdersStateModel } from './orders.model';
import { Injectable, inject } from '@angular/core';
import { GetOrdersByUserId } from './orders.actions';
import { OrderService } from '../services/order.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../interfaces/order.interface';

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    loading: false,
    orders: [],
    selectedOrder: null,
    page: 1,
    filterInput: '',
  },
})

@Injectable({ providedIn: 'root' })
export class OrdersState {
  orderService = inject(OrderService);
  toastService = inject(ToastrService);


  @Selector()
  static isLoading(state: OrdersStateModel): boolean | undefined {
    return state.loading;
  }

  @Selector()
  static orders(state: OrdersStateModel): Order[] | undefined  {
    return state.orders ?? [];
  }



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
    ).subscribe();
  }
}
