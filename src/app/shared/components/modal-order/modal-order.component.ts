import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-order',
  standalone: true,
  imports: [],
  templateUrl: './modal-order.component.html',
  styleUrl: './modal-order.component.css',
})
export class ModalOrderComponent {
  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
