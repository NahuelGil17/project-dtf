import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/userOrders.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserPreferences } from '../../../auth/interfaces/auth.interface';
import { AuthState } from '../../../auth/state/auth.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  imports: [CommonModule],
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  userId: string = '';

  @Select(AuthState.preferences)
  preferences$!: Observable<UserPreferences>

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.preferences$.subscribe(preferences => {
      if (preferences) {
        console.log(preferences);
        
        //this.userId = preferences.ci;
        this.userId = preferences.uid;
        this.getOrdersByUserId(this.userId);
      }
    });
  }

  getOrdersByUserId(userId: string): void {
    this.orderService.getOrdersByUserId(userId)
      .subscribe(orders => {
        this.orders = orders;
        console.log(this.orders);
      });
      
      
  }
}
