import { Table, ValueDolar, Video } from '../interfaces/settings.interface';

export class SettingsStateModel {
  loading?: boolean;
  tableLoading?: boolean;
  videoLoading?: boolean;
  valueDolarLoading?: boolean;
  removeTableLoading?: boolean;
  tables?: Table[];
  videos?: Video[];
  valueDolar?: ValueDolar;
}
