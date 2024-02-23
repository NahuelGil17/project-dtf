import { Status } from "../../../shared/enums/status.enum";

export interface Order {
    workName: string;
    type: string;
    note: string;
    date: string;
    files: File[];
    mode: string;
    filesCount: number;
    id: string;
    creationDate: Date;
    status: Status
    userId: string;
}