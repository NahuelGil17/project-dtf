import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SettingsStateModel } from './setting.model';
import { Injectable, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import {
  CreateTable,
  CreateValueDolar,
  CreateVideo,
  GetSettings,
  RemoveTable,
  UpdateTable,
  UpdateValueDolar,
  UpdateVideo,
} from './setting.action';
import { Observable, catchError, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    loading: false,
    tables: [],
    videos: [],
    valueDolar: [],
  },
})
@Injectable({ providedIn: 'root' })
export class SettingsState {
  settingsService = inject(SettingsService);

  @Selector()
  static settingsLoading(state: SettingsStateModel): boolean | undefined {
    return state.loading;
  }

  @Action(GetSettings, { cancelUncompleted: true })
  getSettings(
    ctx: StateContext<SettingsStateModel>,
    action: GetSettings
  ): Observable<void> {
    ctx.patchState({ loading: true });
    return this.settingsService.getSettings().pipe(
      tap((settings: any) => {
        const stateToUpdate: any = {};
        settings.forEach((setting: any) => {
          if (setting.rows && setting.columns) {
            stateToUpdate.tables = {
              id: setting.id,
              rows: setting.rows,
              columns: setting.columns,
            };
          }
          if (setting.url) {
            stateToUpdate.videos = {
              id: setting.id,
              url: setting.url,
            };
          }
        });
        ctx.patchState({ ...stateToUpdate });
        ctx.patchState({ loading: false });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al cargar configuración',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }

  @Action(CreateTable)
  createTable(
    ctx: StateContext<SettingsStateModel>,
    action: CreateTable
  ): Observable<void> {
    const { table } = action.payload;
    return this.settingsService.createTable(table).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tabla creada con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear tabla',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }

  @Action(UpdateTable)
  updateTable(
    ctx: StateContext<SettingsStateModel>,
    action: UpdateTable
  ): Observable<void> {
    const { id, table } = action.payload;
    ctx.patchState({ loading: true });
    return this.settingsService.updateTable(id, table).pipe(
      tap((settings: any) => {
        ctx.patchState({ loading: false });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tabla actualizada con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al actualizar tabla',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }

  @Action(RemoveTable)
  removeTable(
    ctx: StateContext<SettingsStateModel>,
    action: RemoveTable
  ): Observable<void> {
    return this.settingsService.removeTable(action.payload).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tabla eliminada con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error eliminando tabla',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }

  @Action(CreateVideo)
  createVideo(
    ctx: StateContext<SettingsStateModel>,
    action: CreateVideo
  ): Observable<void> {
    return this.settingsService.createVideo(action.payload.url).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Video creado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error creando video',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }

  @Action(UpdateVideo)
  updateVideo(
    ctx: StateContext<SettingsStateModel>,
    action: UpdateVideo
  ): Observable<void> {
    const { videoId, url } = action.payload;
    return this.settingsService.updateVideo(videoId, url).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Video actualizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          heightAuto: true,
          icon: 'error',
          title: 'Error actualizando video',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }

  @Action(CreateValueDolar)
  createValueDolar(
    ctx: StateContext<SettingsStateModel>,
    action: CreateValueDolar
  ): Observable<void> {
    const { value } = action.payload;
    return this.settingsService.createValueDolar(Number(value)).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Valor del dólar actualizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error actualizando valor del dólar',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }

  @Action(UpdateValueDolar)
  updateValueDolar(
    ctx: StateContext<SettingsStateModel>,
    action: CreateValueDolar
  ): Observable<void> {
    const { value } = action.payload;
    return this.settingsService.createValueDolar(Number(value)).pipe(
      tap((settings: any) => {
        ctx.patchState(settings);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Valor del dólar actualizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error actualizando valor del dólar',
          showConfirmButton: false,
          timer: 1500,
        });
        return throwError(() => error);
      })
    );
  }
}
