import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(value: any, quantity?: number): any {
    return (value.replace(/^(.{70}[^\s]*).*/, '$1') + '\n') + '...';
  }
}
