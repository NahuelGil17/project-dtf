import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-make-order',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.css',
})
export class MakeOrderComponent {}
