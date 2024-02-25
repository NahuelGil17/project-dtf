import { Action, State, StateContext } from '@ngxs/store';
import { SettingsStateModel } from './setting.model';
import { Injectable, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import {
  createTable,
  createVideo,
  getSettings,
  removeTable,
  updateTable,
  updateVideo,
} from './setting.action';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    loading: false,
    tables: [],
    videos: [],
  },
})
@Injectable({ providedIn: 'root' })
export class SettingsState {
  settingsService = inject(SettingsService);
  toastService = inject(ToastrService);

  @Action(getSettings)
  getSettings(ctx: StateContext<SettingsStateModel>): Observable<void> {
    ctx.patchState({ loading: true });
    return this.settingsService.getSettings().pipe(
      tap((settings: any) => {
        console.log('Settings received:', settings);
        ctx.patchState(settings);
        ctx.patchState({ loading: false });
      }),
      catchError((error) => {
        this.toastService.error('Error fetching settings');
        return throwError(() => error);
      })
    );
  }

  @Action(createTable)
  createTable(
    ctx: StateContext<SettingsStateModel>,
    action: createTable
  ): Observable<void> {
    return this.settingsService.createTable(action.payload).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        this.toastService.success('Tabla creada con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error creando tabla');
        return throwError(error);
      })
    );
  }

  @Action(updateTable)
  updateTable(
    ctx: StateContext<SettingsStateModel>,
    action: updateTable
  ): Observable<void> {
    const { tableId, table } = action.payload;
    return this.settingsService.updateTable(tableId, table).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        this.toastService.success('Tabla actualizada con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error actualizando tabla');
        return throwError(error);
      })
    );
  }

  @Action(removeTable)
  removeTable(
    ctx: StateContext<SettingsStateModel>,
    action: removeTable
  ): Observable<void> {
    return this.settingsService.removeTable(action.payload).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        this.toastService.success('Tabla eliminada con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error eliminando tabla');
        return throwError(error);
      })
    );
  }

  @Action(createVideo)
  createVideo(
    ctx: StateContext<SettingsStateModel>,
    action: createVideo
  ): Observable<void> {
    return this.settingsService.createVideo(action.payload).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        this.toastService.success('Video creado con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error creando video');
        return throwError(error);
      })
    );
  }

  @Action(updateVideo)
  updateVideo(
    ctx: StateContext<SettingsStateModel>,
    action: updateVideo
  ): Observable<void> {
    const { videoId, url } = action.payload;
    return this.settingsService.updateVideo(videoId, url).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        this.toastService.success('Video actualizado con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error actualizando video');
        return throwError(error);
      })
    );
  }
}
