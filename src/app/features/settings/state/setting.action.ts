import { Table, Video } from '../interfaces/settings.interface';

export class getSettings {
  static readonly type = '[Settings] Get Settings';
  constructor(public readonly payload: { table: Table; url: Video }) {}
}

export class createTable {
  static readonly type = '[Settings] Create Table';
  constructor(public readonly payload: Table) {}
}

export class updateTable {
  static readonly type = '[Settings] Update Table';
  constructor(public readonly payload: { tableId: string; table: Table }) {}
}

export class removeTable {
  static readonly type = '[Settings] Remove Table';
  constructor(public readonly payload: string) {}
}

export class createVideo {
  static readonly type = '[Settings] Create Video';
  constructor(public readonly payload: string) {}
}

export class updateVideo {
  static readonly type = '[Settings] Update Video';
  constructor(public readonly payload: { videoId: string; url: string }) {}
}
