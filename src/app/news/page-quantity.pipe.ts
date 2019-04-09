import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageQuantity'
})
export class PageQuantityPipe implements PipeTransform {

  transform(newsQuantity: number, args?: any): any {
    return Math.ceil(newsQuantity / 6);
  }

}
