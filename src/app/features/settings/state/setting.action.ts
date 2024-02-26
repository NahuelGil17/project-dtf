import { Table, TableSend } from '../interfaces/settings.interface';

export class GetSettings {
  static readonly type = '[Setting] Get Setting';
}

export class CreateTable {
  static readonly type = '[Setting] Create Table';
  constructor(public readonly payload: TableSend) {}
}

export class UpdateTable {
  static readonly type = '[Setting] Update Table';
  constructor(public readonly payload: Table) {}
}

export class RemoveTable {
  static readonly type = '[Setting] Remove Table';
  constructor(public readonly payload: string) {}
}

export class CreateVideo {
  static readonly type = '[Setting] Create Video';
  constructor(public readonly payload: {url:string}) {}
}

export class UpdateVideo {
  static readonly type = '[Setting] Update Video';
  constructor(public readonly payload: { videoId: string; url: string }) {}
}
