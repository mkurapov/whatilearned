import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class TempConverterPipe implements PipeTransform {

  transform(value: number, args: string): string {

    let res;
    switch (args) {
      case 'C':
        res = Math.round((value - 32) * 5/9);
        break;
      case 'F':
        res = Math.round(value * 9 / 5) + 32;
        break;
      default:
        res = value;
    }

    return res+'°';
    
  }

}
