import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../core/components/button/button.component';

@Component({
  selector: 'app-make-order',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.css',
})
export class MakeOrderComponent {}
