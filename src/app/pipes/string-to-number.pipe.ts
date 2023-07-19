import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToNumber',
})
export class StringToNumberPipe implements PipeTransform {
  transform(value: string | undefined): number {
    if (value === undefined) {
      return 0;
    }
    return +value;
  }
}
