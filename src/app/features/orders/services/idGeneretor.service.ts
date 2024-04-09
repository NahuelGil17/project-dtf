import { Injectable, inject } from '@angular/core';
import { OrdersState } from '../state/orders.state';
import { AuthState } from '../../auth/state/auth.state';
import { GetTotalOrdersByUserId } from '../state/orders.actions';
import { Actions, Store, ofAction, ofActionSuccessful } from '@ngxs/store';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  private currentId: number = 0;
  private totalOrders: number = 0;
  private userId: string = '';
  private isAdmin: boolean = true;

  constructor(private store: Store, private actions: Actions) {}

  generateUniqueId(): string | void {
    this.userId = this.store.selectSnapshot(AuthState.currentUserId) || '';

    this.getTotalOrdersByUserId(this.userId);
    let id = '';
    const total = this.store.selectSnapshot(OrdersState.adminTotalOrders) || 0;
    this.actions
      .pipe(ofActionSuccessful(GetTotalOrdersByUserId), take(1))
      .subscribe(() => {
        this.totalOrders =
          this.store.selectSnapshot(OrdersState.totalOrders) || 0;
        this.currentId = this.totalOrders;
        this.currentId++;
        id = this.pad(this.currentId, 2);
      });
    return id;
  }

  getTotalOrdersByUserId(userId: string): void {
    this.store.dispatch(new GetTotalOrdersByUserId(userId, this.isAdmin));
  }

  private pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
}
