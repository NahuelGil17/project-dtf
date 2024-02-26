import { Component } from '@angular/core';
import { UserOrdersTableComponent } from '../../components/user-orders-table/user-orders-table.component';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [UserOrdersTableComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {

}
