export interface Order {
    workName: string;
    type: string;
    note: string;
    status: string;
    date: string;
    files: File[];
    mode: string;
    filesCount: number;
}