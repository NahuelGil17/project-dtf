import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() color: string = 'primary';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean | null = false;
  @Input() text: string = 'Button';
}
