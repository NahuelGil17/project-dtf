import { Routes } from '@angular/router';
import { HomePageComponent } from './features/landing/pages/home-page/home-page.component';
import { ContactPageComponent } from './features/landing/pages/contact-page/contact-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { authGuard } from './core/guards/is-auth.guard';
import { UserOrdersComponent } from './features/user-orders/pages/user-orders/user-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  {path:'user-orders', component: UserOrdersComponent},
  {
    path: 'registro',
    component: RegisterPageComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginPageComponent, canActivate: [authGuard] },
  // signInGuard para las rutas que solo puedan acceder los usuarios autenticados
];
