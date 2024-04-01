import { Component } from '@angular/core';
import { AdminOrdersTableComponent } from '../../components/admin-orders-table/admin-orders-table.component';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [AdminOrdersTableComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {

}
