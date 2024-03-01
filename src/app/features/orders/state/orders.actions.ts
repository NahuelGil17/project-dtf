export class SaveOrder {
    static readonly type = '[Orders] Save Order';
    constructor(public readonly payload: any) { }
}

export class GetTotalOrdersByUserId {
    static readonly type = '[Orders] Get Orders By User Id';
    constructor(public readonly userId: string) { }
}

export class getOrdersBySearch {
    static readonly type = '[Orders] Get Orders By Search';
    constructor(public readonly userId: string, public readonly search: string) { }
}

export class getOrdersByPage {
    static readonly type = '[Orders] Get Orders By Page';
    constructor(public readonly userId: string, public readonly isNextPage: boolean) { }
}