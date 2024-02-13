import { Routes } from '@angular/router';
import { HomePageComponent } from './features/landing/pages/home-page/home-page.component';
import { ContactPageComponent } from './features/landing/pages/contact-page/contact-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { authGuard } from './core/guards/is-auth.guard';
import { SettingsPagesComponent } from './features/settings/pages/settings-pages/settings-pages.component';
import { signInGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/components/layout/layout.component';
import { PricePageComponent } from './features/landing/pages/price-page/price-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'precio', component: PricePageComponent },
      {
        path: 'registro',
        component: RegisterPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'settings',
            loadComponent: () =>
              import(
                './features/settings/pages/settings-pages/settings-pages.component'
              ).then((m) => m.SettingsPagesComponent),
            // canActivate: [signInGuard],
          },
        ],
      },
    ],
  },
  // signInGuard para las rutas que solo puedan acceder los usuarios autenticados
];
