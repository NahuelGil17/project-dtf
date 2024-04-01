import { ESeverity } from '../enums/ESeverity.enum';

/**
 * @ignore
 */
export interface SnackBar {
  title: string;
  message: string;
  severity: ESeverity;
}
