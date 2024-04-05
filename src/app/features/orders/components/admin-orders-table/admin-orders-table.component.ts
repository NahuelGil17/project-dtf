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
import { Status } from './../../../../shared/enums/status.enum';
import { OrderService } from '../../services/order.service';
import {
  GetTotalOrdersByUserId,
  getOrdersBySearch,
  getOrdersByPage,
} from '../../state/orders.actions';
import { OrdersState } from '../../state/orders.state';
import Swal from 'sweetalert2';
import { Dialog } from '@angular/cdk/dialog';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { environment } from '../../../../environment/environment.develop';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin-orders-table',
  standalone: true,
  imports: [
    CommonModule,
    FormatDatePipe,
    OrderStatusPipe,
    RouterModule,
    MatTooltipModule,
  ],
  templateUrl: './admin-orders-table.component.html',
  styleUrl: './admin-orders-table.component.css',
})
export class AdminOrdersTableComponent {
  @Select(OrdersState.isLoading) isLoading$!: Observable<boolean>;
  @Select(OrdersState.orders) orders$!: Observable<Order[]>;
  @Select(OrdersState.totalOrders) totalOrders$!: Observable<number>;

  userId: string | undefined = '';
  isAdmin: boolean = true;
  currentPage: number = 1;
  startIndex: number = 1;
  endIndex: number = 0;
  totalOrders: number = 0;
  pageSize: number = environment.PAGE_SIZE;
  isLastPage: boolean = false;
  isFirstPage: boolean = true;
  onpenModal: boolean = false;
  statusArray: any[] = [
    { value: Status.PENDING, text: 'Pendiente' },
    { value: Status.INPROGRESS, text: 'En Proceso' },
    { value: Status.FINISHED, text: 'Terminado' },
    { value: Status.DELIVERED, text: 'Entregado' },
  ];
  showDropdownChangeStatus: boolean = false;

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
        new getOrdersBySearch(this.userId, this.isAdmin, inputSearch)
      );
    } else {
      this.currentPage = 1;
      this.getOrderByPage(null);
    }
  }

  getOrderByPage(isNextPage: 'next' | 'prev' | null): void {
    if (!this.userId) return;
    this.store.dispatch(
      new getOrdersByPage(this.userId, this.isAdmin, isNextPage)
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

  confirmChangeStatus(order: Order): void {
    Swal.fire({
      title: 'Quieres cambiar el estado?',
      text: `Quieres cambiar el estado a ${this.checkStatus(order.status + 1)}`,
      icon: 'warning',
      //showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiado!',
          text: `El estado ha sido cambiado a ${this.checkStatus(
            order.status + 1
          )}.`,
          icon: 'success',
        });
      }
    });
    console.log('changeStatus', order.custId);
  }
  checkStatus(status: number): string {
    let _status = Status[status];
    switch (_status) {
      case 'INPROGRESS':
        return 'EN PROCESO';
      case 'FINISHED':
        return 'TERMINADO';
      case 'DELIVERED':
        return 'ENTREGADO';
      default:
        return 'ENTREGADO';
    }
  }

  changeStatus(order: Order): void {}

  openChangeStatusDropdown(): void {
    this.showDropdownChangeStatus = !this.showDropdownChangeStatus;
  }
}
