import { OrderObject as OrderObject } from '../interfaces/order.interface';

export class SaveOrder {
  static readonly type = '[Orders] Save Order';
  constructor(public readonly payload: any) {}
}

export class GetTotalOrdersByUserId {
    static readonly type = '[Orders] Get Total Orders By User Id';
    constructor(public readonly userId: string) { }
}

export class getOrdersBySearch {
    static readonly type = '[Orders] Get Orders By Search';
    constructor(public readonly userId: string, public readonly search: string) { }
}

export class getOrdersByPage {
    static readonly type = '[Orders] Get Orders By Page';
    constructor(public readonly userId: string, public readonly isNextPage: 'next' | 'prev' | null) { }
}
export class GetOrdersByUserId {
  static readonly type = '[Orders] Get Orders By User Id';
  constructor(public readonly userId: string) {}
}

export class saveOrderFiles {
  static readonly type = '[Orders] Save Order Files';
  constructor(public readonly payload: File[]) {}
}

export class saveOrder {
  static readonly type = '[Orders] Save Order';
  constructor(public readonly payload: OrderObject) {}
}

export class GetAvatarUrl {
  static readonly type = '[Orders] Get Avatar Url';
  constructor(public readonly refs: any) {}
}
