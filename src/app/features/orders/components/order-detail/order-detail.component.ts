import { Component, Inject } from '@angular/core';
import {DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Order } from '../../interfaces/order.interface';
import { OrderStatusPipe } from "../../pipes/order-status.pipe";
import { FormatDatePipe } from "../../../../shared/pipes/format-date.pipe";
import { OrderTypePipe } from "../../pipes/order-type.pipe";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-detail',
    standalone: true,
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.css',
    imports: [CommonModule,OrderStatusPipe, FormatDatePipe, OrderTypePipe]
})
export class OrderDetailComponent {
  isOpen = false;

  constructor(@Inject(DIALOG_DATA) public data: { order: Order },private dialogRef: DialogRef) {}

  close() {
    this.dialogRef.close();
  }
}
