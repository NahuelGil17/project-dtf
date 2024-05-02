import { Status } from "../../../shared/enums/status.enum";

export interface Order {
  workName: string;
  type: string;
  note: string;
  date: string;
  files: CustomFile[];
  mode: string;
  filesCount: number;
  id: string;
  creationDate: Date;
  status: Status;
  user: User;
  custId: string;
  showDropdownChangeStatus: boolean;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  ci: string;
  phoneNumber: string;

}

export interface OrderForm {
    files: File[];
    filesCount: number;
    mode: string;
    note: string;
    type: string;
    workName: string;
}

export interface CustomFile {
    file: string;
    type: string;
    count: string;
}

export interface OrderObject {}