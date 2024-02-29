import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { MakeOrderFormComponent } from '../../components/make-order-form/make-order-form.component';
import { SaveOrder, saveOrderFiles } from '../../state/orders.actions';
import { OrderForm } from '../../interfaces/order.interface';
import { OrdersState } from '../../state/orders.state';

@Component({
  selector: 'app-make-order',
  standalone: true,
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.css',
  imports: [MakeOrderFormComponent, AsyncPipe],
})
export class MakeOrderComponent {
  store = inject(Store);
  actions = inject(Actions);
  toastrService = inject(ToastrService);

  saveOrder(formData: OrderForm) {
    if (!formData) {
      this.toastrService.error('Error al guardar la orden');
    }
    this.store.dispatch(new saveOrderFiles(formData.files));
    this.actions.pipe(ofActionSuccessful(saveOrderFiles)).subscribe(() => {
      console.log(formData);
      const currentUrl = this.store.selectSnapshot(OrdersState).currentFiles;
      const filesUrl = formData.files.map((file: any, index) => {
        return { count: file.count, file: currentUrl[index] };
      });
      const newOrder = {
        workName: formData.workName,
        mode: formData.mode,
        type: formData.type,
        note: formData.note,
        files: filesUrl,
      };
      this.store.dispatch(new SaveOrder(newOrder));
    });
  }
}
