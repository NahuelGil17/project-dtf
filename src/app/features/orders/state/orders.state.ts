import { Action, Selector, State, StateContext } from '@ngxs/store';
import { OrdersStateModel } from './orders.model';
import { DebugElement, Injectable, inject } from '@angular/core';
import {
  GetTotalOrdersByUserId,
  getOrdersBySearch,
  getOrdersByPage,
} from './orders.actions';
import { OrderService } from '../services/order.service';
import {
  catchError,
  tap,
  throwError,
  Observable,
  exhaustMap,
  forkJoin,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {} from 'rxjs';
import { Order } from '../interfaces/order.interface';
import {
  GetAvatarUrl,
  GetOrdersByUserId,
  SaveOrder,
  saveOrderFiles,
} from './orders.actions';

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    loading: false,
    orders: [],
    selectedOrder: null,
    currentFiles: [],
    page: 1,

    totalOrders: 0,
    filterInput: '',
  },
})
@Injectable({ providedIn: 'root' })
export class OrdersState {
  orderService = inject(OrderService);
  toastService = inject(ToastrService);

  @Selector() currentFiles(
    state: OrdersStateModel
  ): string[] | null | undefined {
    return state.currentFiles;
  }

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
    this.orderService
      .getOrdersByPage(action.userId, action.isNextPage)
      .pipe(
        tap(
          (orders: Order[] | void) => {
            ctx.patchState({ orders, loading: false });
          },
          catchError((error: any) => {
            ctx.patchState({ loading: false });
            this.toastService.error(error, 'Error al obtener las ordenes');
            return throwError(() => new Error(error));
          })
        )
      )
      .subscribe();
  }

  @Action(SaveOrder, { cancelUncompleted: true })
  saveOrder(ctx: any, action: SaveOrder) {
    ctx.patchState({ loading: true });
    const order = action.payload;
    return this.orderService.saveOrder(action.payload).pipe(
      tap(
        (order: any) => {
          ctx.patchState({ loading: false });
        },
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          this.toastService.error(error, 'Error al guardar la orden');
          return throwError(() => error);
        })
      )
    );
  }

  @Action(saveOrderFiles, { cancelUncompleted: true })
  saveOrderFiles(ctx: any, action: saveOrderFiles) {
    ctx.patchState({ loading: true });

    const saveFileObservables = action.payload.map((file: File) =>
      this.orderService.saveOrderFile(file)
    );

    return forkJoin(saveFileObservables).pipe(
      tap((files: any) => {
        ctx.patchState({ loading: false });
      }),
      exhaustMap((files: any): any => {
        return ctx.dispatch(new GetAvatarUrl(files));
      }),
      catchError((error: any) => {
        ctx.patchState({ loading: false });
        this.toastService.error(error, 'Error al guardar los archivos');
        return throwError(() => error);
      })
    );
  }

  @Action(GetAvatarUrl, { cancelUncompleted: true })
  getAvatarUrl(
    ctx: StateContext<OrdersStateModel>,
    action: GetAvatarUrl
  ): Observable<any> {
    ctx.patchState({ loading: true });
    const refsObservables = action.refs.map((file: any) => {
      return this.orderService.getAvatarUrl(file.ref);
    });
    return forkJoin(refsObservables).pipe(
      tap((response: any) => {
        ctx.patchState({ loading: false });
        ctx.patchState({ currentFiles: response });
      }),
      catchError((error: any) => {
        ctx.patchState({ loading: false });
        this.toastService.error(error, 'Error al obtener la url del avatar');
        return throwError(() => error);
      })
    );
  }

  getErrorMessage(error: any): string {
    let errorMessage = 'An unknown error occurred!';
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Este usuario ha sido deshabilitado.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido.';
          break;
        case 'auth/invalid-login-credentials':
          errorMessage = 'Credenciales invalidas.';
          break;
        default:
          errorMessage = 'Error inesperado';
          break;
      }
    }
    return errorMessage;
  }
}
