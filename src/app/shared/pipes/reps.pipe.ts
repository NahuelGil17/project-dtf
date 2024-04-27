import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repetition',
  standalone: true,
})
export class RepetitionPipe implements PipeTransform {
  transform(value: string): string {
    return parseInt(value) === 1
      ? `${value} repeticion`
      : `${value} repeticiones`;
  }
}
