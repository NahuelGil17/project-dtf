import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { NgxsModule } from '@ngxs/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthState } from './features/auth/state/auth.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  NgxsStoragePluginModule,
  SESSION_STORAGE_ENGINE,
} from '@ngxs/storage-plugin';
import { SettingsState } from './features/settings/state/setting.state';
import { OrdersState } from './features/orders/state/orders.state';
import { UserState } from './features/user/state/user.state';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot(
        [
          /* your state classes here */
          AuthState,
          SettingsState,
          OrdersState,
          UserState,
        ]
        // {
        //   developmentMode: true,
        // }
      )
    ),
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot()),
    importProvidersFrom(
      NgxsStoragePluginModule.forRoot({
        key: [
          {
            key: AuthState,
            engine: SESSION_STORAGE_ENGINE,
          },
        ],
      })
    ),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: "AIzaSyDGORIzdj3Qs3N_3_K_Yl_PKKCXirX50mI",
          authDomain: "dtf-central.firebaseapp.com",
          projectId: "dtf-central",
          storageBucket: "dtf-central.appspot.com",
          messagingSenderId: "510031789892",
          appId: "1:510031789892:web:e94133dadaaaee83372111"
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),

    importProvidersFrom(SweetAlert2Module.forRoot()),

    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
};
