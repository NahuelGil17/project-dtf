export interface Table {
  id: string;
  table: {
    columns: string[];
    rows: string[][];
  };
}

export interface TableSend {
  table: {
    columns: string[];
    rows: string[][];
  };
}

export interface Video {
  url: string;
  id: string;
}

export interface Settings {
  map(arg0: (setting: any) => void): unknown;
  tables: Table[];
  videos: Video[];
}
