import { Component } from '@angular/core';
import { MakeOrderFormComponent } from "../../components/make-order-form/make-order-form.component";

@Component({
    selector: 'app-make-order',
    standalone: true,
    templateUrl: './make-order.component.html',
    styleUrl: './make-order.component.css',
    imports: [MakeOrderFormComponent]
})
export class MakeOrderComponent {

}
