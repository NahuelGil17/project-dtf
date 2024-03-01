import { Action, Selector, State } from '@ngxs/store';
import { OrdersStateModel } from './orders.model';
import { DebugElement, Injectable, inject } from '@angular/core';
import {
  GetTotalOrdersByUserId,
  getOrdersBySearch,
  getOrdersByPage,
} from './orders.actions';
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
    pageSize: 10,
    totalOrders: 0,
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
  static orders(state: OrdersStateModel): Order[] | undefined {
    return state.orders ?? [];
  }

  @Selector()
  static totalOrders(state: OrdersStateModel): number | undefined {
    return state.totalOrders;
  }

  @Selector()
  static pageSize(state: OrdersStateModel): number | undefined {
    return state.pageSize;
  }

  @Action(GetTotalOrdersByUserId, { cancelUncompleted: true })
  GetTotalOrdersByUserId(ctx: any, action: GetTotalOrdersByUserId) {
    ctx.patchState({ loading: true });
    this.orderService
      .GetTotalOrdersByUserId(action.userId)
      .pipe(
        tap((totalOrders: number) => {
          ctx.patchState({ totalOrders, loading: false });
        }),
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          this.toastService.error(
            error,
            'Error al obtener el total de las ordenes del usuario'
          );
          return throwError(() => new Error(error));
        })
      )
      .subscribe();
  }

  @Action(getOrdersBySearch, { cancelUncompleted: true })
  getOrdersBySearch(ctx: any, action: getOrdersBySearch) {
    ctx.patchState({ loading: true });
    this.orderService
      .searchOrders(action.userId, action.search)
      .pipe(
        tap(
          (orders: Order[] | void) => {
            ctx.patchState({ orders, loading: false });
          },
          catchError((error: any) => {
            ctx.patchState({ loading: false });
            this.toastService.error(
              error,
              'Error al obtener las ordenes buscadas'
            );
            return throwError(() => new Error(error));
          })
        )
      )
      .subscribe();
  }

  @Action(getOrdersByPage, { cancelUncompleted: true })
  getOrdersByPage(ctx: any, action: getOrdersByPage) {
    ctx.patchState({ loading: true });
    this.orderService.getOrdersByPage(action.userId, action.isNextPage).pipe(
      tap(
        (orders: Order[] | void) => {
          console.log('GETORDERSBYPAGE', orders);
          ctx.patchState({ orders, loading: false });
        },
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          this.toastService.error(error, 'Error al obtener las ordenes');
          return throwError(() => new Error(error));
        })
      )
    ).subscribe();
  }
}
