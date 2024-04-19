import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  Observable,
  catchError,
  exhaustMap,
  forkJoin,
  tap,
  throwError,
} from 'rxjs';
import Swal from 'sweetalert2';
import { Order } from '../interfaces/order.interface';
import { OrderService } from '../services/order.service';
import {
  ChangeStatus,
  DeleteOrder,
  GetAvatarUrl,
  GetOrdersByPage,
  GetOrdersBySearch,
  GetTotalOrdersByUserId,
  SaveOrder,
  saveOrderFiles,
 
} from './orders.actions';
import { OrdersStateModel } from './orders.model';

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
    return state.orders?.map((order: Order) => {
      return {
        ...order,
        showDropdownChangeStatus: false,
      };
    });
  }

  @Selector()
  static totalOrders(state: OrdersStateModel): number | undefined {
    return state.totalOrders;
  }

  @Action(GetTotalOrdersByUserId, { cancelUncompleted: true })
  GetTotalOrdersByUserId(ctx: any, action: GetTotalOrdersByUserId) {
    ctx.patchState({ loading: true });
    this.orderService
      .GetTotalOrdersByUserId(action.userId, action.isAdmin)
      .pipe(
        tap((totalOrders: number) => {
          ctx.patchState({ totalOrders, loading: false });
        }),
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al obtener el total de las ordenes del usuario',
            validationMessage: error,
            showConfirmButton: false,
            timer: 1500,
          });
          return throwError(() => new Error(error));
        })
      )
      .subscribe();
  }

  @Action(GetOrdersBySearch, { cancelUncompleted: true })
  getOrdersBySearch(ctx: any, action: GetOrdersBySearch) {
    ctx.patchState({ loading: true });
    this.orderService
      .searchOrders(action.userId, action.isAdmin, action.search)
      .pipe(
        tap(
          (orders: Order[] | void) => {
            
            
            ctx.patchState({ orders, loading: false });
          },
          catchError((error: any) => {
            ctx.patchState({ loading: false });
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al obtener las ordenes buscadas',
              validationMessage: error,
              showConfirmButton: false,
              timer: 1500,
            });
            return throwError(() => new Error(error));
          })
        )
      )
      .subscribe();
  }

  @Action(GetOrdersByPage, { cancelUncompleted: true })
  getOrdersByPage(ctx: any, action: GetOrdersByPage) {
    ctx.patchState({ loading: true });
    this.orderService
      .getOrdersByPage(action.userId, action.isAdmin, action.isNextPage)
      .pipe(
        tap(
          (orders: Order[] | void) => {
            ctx.patchState({ orders, loading: false });
          },
          catchError((error: any) => {
            ctx.patchState({ loading: false });
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al obtener las ordenes',
              validationMessage: error,
              showConfirmButton: false,
              timer: 1500,
            });
            return throwError(() => new Error(error));
          })
        )
      )
      .subscribe();
  }

  @Action(ChangeStatus, { cancelUncompleted: true })
  changeStatus(ctx: any, action: ChangeStatus) {
    ctx.patchState({ loading: true });
    this.orderService
      .changeStatus(action.orderId,action.statusValue)
      .pipe(
        tap(() => {
          const state = ctx.getState();
          const updatedOrders = state.orders.map((order: { id: string; }) => {
            if (order.id === action.orderId) {
              return { ...order, status: action.statusValue };
            }
            return order;
          });
          setTimeout(() => {
            ctx.patchState({ orders: updatedOrders, loading: false });
          }, 300);
        }),
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Error al cambiar el estado de la orden`,
            validationMessage: error,
            showConfirmButton: false,
            timer: 1500,
          });
          return throwError(() => new Error(error));
        })
      )
      .subscribe();
  }

  @Action(DeleteOrder, { cancelUncompleted: true })
  deleteOrder(ctx: any, action: DeleteOrder) {
    ctx.patchState({ loading: true });
    this.orderService
      .deleteOrder(action.orderId)
      .pipe(
        tap(() => {
          // Eliminar la orden del estado local después de que se haya eliminado con éxito
          const state = ctx.getState();
          const updatedOrders = state.orders.filter((order: { id: string; }) => order.id !== action.orderId);
          ctx.patchState({ orders: updatedOrders, loading: false });
        }),
        catchError((error: any) => {
          ctx.patchState({ loading: false });
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Error al eliminar la orden ${action.orderId}`,
            validationMessage: error,
            showConfirmButton: false,
            timer: 1500,
          });
          return throwError(() => new Error(error));
        })
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
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al actualizar tabla',
            validationMessage: error,
            showConfirmButton: false,
            timer: 1500,
          });
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
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al guardar los archivos',
          validationMessage: error,
          showConfirmButton: false,
          timer: 1500,
        });
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
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al obtener la url del avatar',
          showConfirmButton: false,
          timer: 1500,
        });
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
