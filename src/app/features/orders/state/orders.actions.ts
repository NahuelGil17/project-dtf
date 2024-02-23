export class Orders {
    static readonly type = '[Orders] Save Order';
    constructor(public readonly payload: any) {}
}