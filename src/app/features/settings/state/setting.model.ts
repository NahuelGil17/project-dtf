import { Table, Video } from '../interfaces/settings.interface';

export class SettingsStateModel {
  loading?: boolean;
  tables?: Table[];
  videos?: Video[];
  test?: any[];
}
