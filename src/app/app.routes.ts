import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { signInGuard } from './core/guards/auth.guard';
import { authGuard } from './core/guards/is-auth.guard';
import { NotFoundPageComponent } from './core/landing/pages/not-found-page/not-found-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { ContactPageComponent } from './features/landing/pages/contact-page/contact-page.component';
import { HomePageComponent } from './features/landing/pages/home-page/home-page.component';
import { PricePageComponent } from './features/landing/pages/price-page/price-page.component';
import { isAdmin } from './core/guards/is-admin.guard';
import { LocationPageComponent } from './features/landing/pages/location-page/location-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'contacto', component: ContactPageComponent },
      { path: 'ubicacion', component: LocationPageComponent },
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
        path: 'pedido',
        loadComponent: () =>
          import(
            './features/orders/pages/make-order/make-order.component'
          ).then((m) => m.MakeOrderComponent),
        canActivate: [signInGuard],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'configuraciones',
            loadComponent: () =>
              import(
                './features/settings/pages/settings-pages/settings-pages.component'
              ).then((m) => m.SettingsPagesComponent),
            canActivate: [signInGuard, isAdmin],
          },
          {
            path: 'ordenes',
            loadComponent: () =>
              import(
                './features/orders/pages/admin-orders/admin-orders.component'
              ).then((m) => m.AdminOrdersComponent),
            canActivate: [signInGuard, isAdmin],
          },
        ],
      },
      {
        path: 'usuario',
        children: [
          {
            path: 'ordenes',
            loadComponent: () =>
              import(
                './features/orders/pages/user-orders/user-orders.component'
              ).then((m) => m.UserOrdersComponent),
            canActivate: [signInGuard],
          },
          {
            path: 'perfil',
            loadComponent: () =>
              import(
                './features/user/pages/user-profile-page/user-profile-page.component'
              ).then((m) => m.UserProfilePageComponent),
            canActivate: [signInGuard],
          },
        ],
      },
      // signInGuard para las rutas que solo puedan acceder los usuarios autenticados
      { path: '**', component: NotFoundPageComponent },
    ],
  },
];
