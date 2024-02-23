export class SaveOrder {
    static readonly type = '[Orders] Save Order';
    constructor(public readonly payload: any) {}
}

export class GetOrdersByUserId {
    static readonly type = '[Orders] Get Orders By User Id';
    constructor(public readonly userId: string) {}
}