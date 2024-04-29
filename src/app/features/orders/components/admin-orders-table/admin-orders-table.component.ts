import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../environment/environment.develop';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { AuthState } from '../../../auth/state/auth.state';
import { Order } from '../../interfaces/order.interface';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import { OrderService } from '../../services/order.service';
import {
  ChangeStatus,
  GetTotalOrdersByUserId,
  GetOrdersByPage,
  GetOrdersBySearch,
  DeleteOrder,
} from '../../state/orders.actions';
import { OrdersState } from '../../state/orders.state';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { Status } from './../../../../shared/enums/status.enum';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { MatMenuModule } from '@angular/material/menu';
import { EmailService } from '../../../../core/services/email.service';

@Component({
  selector: 'app-admin-orders-table',
  standalone: true,
  templateUrl: './admin-orders-table.component.html',
  styleUrl: './admin-orders-table.component.css',
  imports: [
    CommonModule,
    FormatDatePipe,
    OrderStatusPipe,
    RouterModule,
    MatTooltipModule,
    LoadingComponent,
    MatMenuModule,
  ],
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
    private emailService: EmailService,
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

    this.actions.pipe(ofActionSuccessful(ChangeStatus)).subscribe(() => {
      this.emailService.sendEmail(
        'nahuelgil98@gmail.com',
        'Cambio de estado',
        'El estado de tu orden ha sido cambiado.'
      ).subscribe(() => {
        console.log('Email enviado');
      });
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

  confirmChangeStatus(
    orderID: string,
    statusValue: number,
    statusText: string
  ): void {
    Swal.fire({
      title: 'Quieres cambiar el estado?',
      text: `Quieres cambiar el estado a ${statusText}?`,
      icon: 'warning',
      //showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeStatus(orderID, statusValue).subscribe(() => {
          this.getOrderByPage(null);
        });
        Swal.fire({
          title: 'Cambiado!',
          text: `El estado ha sido cambiado a ${statusText}.`,
          icon: 'success',
        });
      }
    });
  }

  changeStatus(orderID: string, statusValue: number): Observable<void> {
    return this.store.dispatch(new ChangeStatus(orderID, statusValue));
  }

  deleteOrder(orderId: string, custId: string): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas seguro que quieres eliminar la orden id: ${custId}?`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(new DeleteOrder(orderId));
        Swal.fire({
          title: 'Eliminado!',
          text: 'La orden ha sido eliminada.',
          icon: 'success',
        });
      }
    });
  }

  openChangeStatusDropdown(orderId: string): void {
    this.store.select(OrdersState.orders).subscribe((orders) => {
      orders?.map((order) => {
        if (order && order.id === orderId) {
          order.showDropdownChangeStatus = !order.showDropdownChangeStatus;
        } else {
          order.showDropdownChangeStatus = false;
        }
      });
    });
  }
}
