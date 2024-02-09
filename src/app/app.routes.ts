import { Routes } from '@angular/router';
import { HomePageComponent } from './features/landing/pages/home-page/home-page.component';
import { ContactPageComponent } from './features/landing/pages/contact-page/contact-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { authGuard } from './core/guards/is-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'registro', component: RegisterPageComponent, canLoad: [authGuard] },
  { path: 'login', component: LoginPageComponent, canLoad: [authGuard] },
  // signInGuard para las rutas que solo puedan acceder los usuarios autenticados
];
