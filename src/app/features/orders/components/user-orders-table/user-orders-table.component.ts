import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { UserPreferences } from '../../../auth/interfaces/auth.interface';
import { AuthState } from '../../../auth/state/auth.state';
import { Order } from '../../interfaces/order.interface';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import { OrderService } from '../../services/order.service';
import {
  GetTotalOrdersByUserId,
  GetOrdersBySearch,
  GetOrdersByPage,
} from '../../state/orders.actions';
import { OrdersState } from '../../state/orders.state';
import { Dialog } from '@angular/cdk/dialog';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { environment } from '../../../../environment/environment.develop';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-user-orders-table',
  standalone: true,
  templateUrl: './user-orders-table.component.html',
  styleUrl: './user-orders-table.component.css',
  imports: [
    CommonModule,
    FormatDatePipe,
    OrderStatusPipe,
    RouterModule,
    LoadingComponent,
  ],
})
export class UserOrdersTableComponent {
  @Select(OrdersState.isLoading) isLoading$!: Observable<boolean>;
  @Select(OrdersState.orders) orders$!: Observable<Order[]>;
  @Select(OrdersState.totalOrders) totalOrders$!: Observable<number>;

  userId: string | undefined = '';
  isAdmin: boolean = false;
  currentPage: number = 1;
  startIndex: number = 1;
  endIndex: number = 0;
  totalOrders: number = 0;
  pageSize: number = environment.PAGE_SIZE;
  isLastPage: boolean = false;
  isFirstPage: boolean = true;
  onpenModal: boolean = false;

  constructor(
    private orderService: OrderService,
    private store: Store,
    private dialog: Dialog,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    this.userId = this.store.selectSnapshot(AuthState.currentUserId);

    if (!this.userId) return;
    this.getTotalOrdersByUserId(this.userId);

    this.store.select(OrdersState.totalOrders).subscribe((totalOrders) => {
      if (!totalOrders) return;
      this.totalOrders = totalOrders;
      this.getOrderByPage(null);
      this.calculateEndIndex();
      this.calculateLastPage();
    });
  }

  getTotalOrdersByUserId(userId: string): void {
    this.store.dispatch(new GetTotalOrdersByUserId(userId, this.isAdmin));
  }

  searchOrders(event: Event): void {
    if (!this.userId) return;
    const inputElement = event.target as HTMLInputElement;
    const inputSearch = inputElement.value.trim();
    if (inputSearch.length > 0) {
      this.store.dispatch(
        new GetOrdersBySearch(this.userId, this.isAdmin, inputSearch)
      );
    } else {
      this.currentPage = 1;
      this.getOrderByPage(null);
    }
  }

  getOrderByPage(isNextPage: 'next' | 'prev' | null): void {
    if (!this.userId) return;
    this.store.dispatch(
      new GetOrdersByPage(this.userId, this.isAdmin, isNextPage)
    );
  }

  previousPage(): void {
    this.currentPage--;
    this.getOrderByPage('prev');
    this.calculateLastPage();
    this.calculateFirstPage();
  }

  nextPage(): void {
    this.currentPage++;
    this.getOrderByPage('next');
    this.calculateLastPage();
    this.calculateFirstPage();
  }

  calculateEndIndex() {
    if (this.totalOrders !== undefined && this.pageSize !== undefined) {
      this.endIndex = Math.ceil(this.totalOrders / this.pageSize);
    }
  }

  calculateLastPage(): void {
    if (this.currentPage >= this.endIndex) {
      this.isLastPage = true;
    } else {
      this.isLastPage = false;
    }
  }

  calculateFirstPage(): void {
    if (this.currentPage <= 1) {
      this.isFirstPage = true;
    } else {
      this.isFirstPage = false;
    }
  }

  openOrderDetails(order: Order): void {
    this.dialog.open(OrderDetailComponent, {
      height: '600px',
      width: '800px',
      data: { order: order },
    });
  }
}
