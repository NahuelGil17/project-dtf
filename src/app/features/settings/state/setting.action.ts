import {
  Settings,
  Table,
  TableSend,
  Video,
} from '../interfaces/settings.interface';

export class GetSettings {
  static readonly type = '[Settings] Get Settings';
  constructor() {}
}

export class CreateTable {
  static readonly type = '[Settings] Create Table';
  constructor(public readonly payload: TableSend) {}
}

export class UpdateTable {
  static readonly type = '[Settings] Update Table';
  constructor(public readonly payload: Table) {}
}

export class RemoveTable {
  static readonly type = '[Settings] Remove Table';
  constructor(public readonly payload: string) {}
}

export class CreateVideo {
  static readonly type = '[Settings] Create Video';
  constructor(public readonly payload: string) {}
}

export class UpdateVideo {
  static readonly type = '[Settings] Update Video';
  constructor(public readonly payload: { videoId: string; url: string }) {}
}
