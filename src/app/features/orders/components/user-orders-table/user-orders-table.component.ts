import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { UserPreferences } from '../../../auth/interfaces/auth.interface';
import { AuthState } from '../../../auth/state/auth.state';
import { Order } from '../../interfaces/order.interface';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import { OrderService } from '../../services/order.service';
import {
  GetTotalOrdersByUserId,
  getOrdersBySearch,
  getOrdersByPage
} from '../../state/orders.actions';
import { OrdersState } from '../../state/orders.state';
@Component({
  selector: 'app-user-orders-table',
  standalone: true,
  imports: [CommonModule, FormatDatePipe, OrderStatusPipe, RouterModule],
  templateUrl: './user-orders-table.component.html',
  styleUrl: './user-orders-table.component.css',
})
export class UserOrdersTableComponent {
  @Select(OrdersState.isLoading) isLoading$!: Observable<boolean>;
  @Select(OrdersState.orders) orders$!: Observable<Order[]>;
  @Select(OrdersState.totalOrders) totalOrders$!: Observable<number>;
  @Select(OrdersState.pageSize) pageSize$!: Observable<number> ;

  userId: string = '';
  currentPage: number = 1;
  startIndex: number = 1;

  @Select(AuthState.preferences)
  preferences$!: Observable<UserPreferences>;

  constructor(private orderService: OrderService, private store: Store) {}

  ngOnInit(): void {
    this.preferences$.subscribe((preferences) => {
      if (preferences) {
        this.userId = preferences.uid;
        //this.getOrdersByUserId(this.userId);
        this.getTotalOrdersByUserId(this.userId);
        this.getOrderByPage(false);
        this.calculateRange();
      }
    });
  }

  // getOrdersByUserId(userId: string): void {
  //   this.store.dispatch(new GetOrdersByUserId(this.userId));
  // }

  getTotalOrdersByUserId(userId: string): void {
    this.store.dispatch(new GetTotalOrdersByUserId(this.userId));
  }

  searchOrders(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputSearch = inputElement.value.trim();
    if (inputSearch.length > 0) {
      this.store.dispatch(new getOrdersBySearch(this.userId, inputSearch));
    } else {
      this.currentPage = 1;
      this.getOrderByPage(false);
    }
  }

  calculateRange(): void {
    this.pageSize$.subscribe((pageSize) => {
      this.totalOrders$.subscribe((totalOrders) => {
      });
    });
  }

  getOrderByPage(isNextPage:boolean): void {
    this.pageSize$.subscribe((pageSize) => {
      console.log('pageSize', pageSize);
      
      this.store.dispatch(new getOrdersByPage(this.userId, isNextPage));
    });
  }

  previousPage(): void {
    this.currentPage--;
    this.getOrderByPage(false);
  }

  nextPage(): void {
    this.currentPage++;
    this.getOrderByPage(true);
    this.calculateRange();
  }
}
