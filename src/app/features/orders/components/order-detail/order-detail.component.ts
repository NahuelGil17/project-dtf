import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Order } from '../../interfaces/order.interface';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { OrderTypePipe } from '../../pipes/order-type.pipe';
import { CommonModule } from '@angular/common';
import { OrderModePipe } from '../../../../shared/pipes/order-mode.pipe';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MatListModule } from '@angular/material/list';
import { RepetitionPipe } from "../../../../shared/pipes/reps.pipe";
@Component({
    selector: 'app-order-detail',
    standalone: true,
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.css',
    imports: [
        CommonModule,
        OrderStatusPipe,
        FormatDatePipe,
        OrderTypePipe,
        OrderModePipe,
        ButtonComponent,
        MatListModule,
        RepetitionPipe
    ]
})
export class OrderDetailComponent {
  isOpen = false;

  constructor(
    @Inject(DIALOG_DATA) public data: { order: Order },
    private dialogRef: DialogRef
  ) {}

  downloadFiles() {
    this.data.order.files.forEach((file) => {
      const link = document.createElement('a');
      window.open(file.file, '_blank');
    });
  }
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
