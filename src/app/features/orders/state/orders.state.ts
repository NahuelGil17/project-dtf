import { State } from '@ngxs/store';
import { OrdersStateModel } from './orders.model';
import { Injectable } from '@angular/core';

@State<OrdersStateModel>({
  name: 'orders',
  defaults: {
    loading: false,
    orders: null,
    selectedOrder: null,
  },
})
@Injectable({ providedIn: 'root' })
export class OrdersState {}
