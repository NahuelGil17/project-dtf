import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/userOrders.service';
import { Select } from '@ngxs/store';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPreferences } from '../../../auth/interfaces/auth.interface';
import { AuthState } from '../../../auth/state/auth.state';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
@Component({
  selector: 'app-user-orders-table',
  standalone: true,
  imports: [CommonModule, FormatDatePipe, OrderStatusPipe,RouterModule],
  templateUrl: './user-orders-table.component.html',
  styleUrl: './user-orders-table.component.css'
})
export class UserOrdersTableComponent {

  isLoading: boolean = true;
  orders: Order[] = [];
  userId: string = '';

  @Select(AuthState.preferences)
  preferences$!: Observable<UserPreferences>

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.preferences$.subscribe(preferences => {
      if (preferences) {
        this.userId = preferences.uid;
        this.getOrdersByUserId(this.userId);
      }
    });
  }

  getOrdersByUserId(userId: string): void {
    this.orderService.getOrdersByUserId(userId)
      .subscribe(orders => {
        this.isLoading = false;
        this.orders = orders;
      });
  }

  searchOrders(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputSearch = inputElement.value.trim();
    if (inputSearch.length > 3) {
      this.orderService.searchOrders(inputSearch)
        .subscribe(orders => {
          this.orders = orders;
        });
    }else{
      this.getOrdersByUserId(this.userId);
    }
  }

}
