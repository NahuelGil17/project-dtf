import { Table, ValueDolar, Video } from '../interfaces/settings.interface';

export class SettingsStateModel {
  loading?: boolean;
  tables?: Table[];
  videos?: Video[];
  valueDolar?: ValueDolar;
}
