import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SettingsStateModel } from './setting.model';
import { Injectable, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import {
  CreateTable,
  CreateVideo,
  GetSettings,
  RemoveTable,
  UpdateTable,
  UpdateVideo,
} from './setting.action';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    loading: false,
    tables: [],
    videos: [],
    test: [],
  },
})
@Injectable({ providedIn: 'root' })
export class SettingsState {
  settingsService = inject(SettingsService);
  toastService = inject(ToastrService);

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
        this.toastService.error('Error al cargar configuración');
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
        this.toastService.success('Tabla creada con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error creando tabla');
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
        this.toastService.success('Tabla actualizada con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error actualizando tabla');
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
        this.toastService.success('Tabla eliminada con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error eliminando tabla');
        return throwError(error);
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
        this.toastService.success('Video creado con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error creando video');
        return throwError(error);
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
        this.toastService.success('Video actualizado con éxito');
      }),
      catchError((error) => {
        this.toastService.error('Error actualizando video');
        return throwError(error);
      })
    );
  }
}
