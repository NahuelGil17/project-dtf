import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  private currentId: number = 0;

  constructor() {}

  generateUniqueId(): string {
    this.currentId++;
    return this.pad(this.currentId, 2);
  }

  private pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
}
