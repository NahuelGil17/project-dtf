import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { MakeOrderFormComponent } from '../../components/make-order-form/make-order-form.component';
import { SaveOrder, saveOrderFiles } from '../../state/orders.actions';
import { OrderForm } from '../../interfaces/order.interface';
import { OrdersState } from '../../state/orders.state';
import { AuthState } from '../../../auth/state/auth.state';
import { Observable, take } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IdGeneratorService } from '../../services/idGeneretor.service';

@Component({
  selector: 'app-make-order',
  standalone: true,
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.css',
  imports: [MakeOrderFormComponent, AsyncPipe, SweetAlert2Module],
})
export class MakeOrderComponent {
  @Select(OrdersState.isLoading) loading$!: Observable<boolean>;

  store = inject(Store);
  actions = inject(Actions);
  toastrService = inject(ToastrService);
  router = inject(Router);
  idGenerator = inject(IdGeneratorService);

  saveOrder(formData: OrderForm) {
    if (!formData) {
      this.toastrService.error('Error al guardar la orden');
    }
    this.store.dispatch(new saveOrderFiles(formData.files));
    this.actions
      .pipe(ofActionSuccessful(saveOrderFiles), take(1))
      .subscribe(() => {
        const currentUrl = this.store.selectSnapshot(OrdersState).currentFiles;
        const filesUrl = formData.files.map((file: any, index) => {
          return {
            count: file.count,
            file: currentUrl[index],
            type: file.file.type,
          };
        });
        const newOrder = {
          workName: formData.workName,
          mode: formData.mode,
          type: formData.type,
          note: formData.note,
          files: filesUrl,
          status: 0,
          creationDate: new Date().valueOf(),
          userId: this.store.selectSnapshot(AuthState).preferences.uid,
        };
        this.store.dispatch(new SaveOrder(newOrder));
        this.actions
          .pipe(ofActionSuccessful(SaveOrder), take(1))
          .subscribe(() => {
            Swal.fire(
              'Pedido realizado',
              'El pedido ha sido realizado con éxito',
              'success'
            );
            this.router.navigate(['/usuario/ordenes']);
          });
      });
  }
}
