import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthState } from '../../../features/auth/state/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment.develop';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  @Select(AuthState.isAdmin) isAdmin$!: Observable<boolean>;
  currentYear: number = 2024;
  phone: number = environment.PHONE
  

  constructor() {}

  ngOnInit(): void {
    this.currentYear = this.getCurrentYear();
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
