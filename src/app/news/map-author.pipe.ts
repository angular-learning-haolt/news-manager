import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapAuthor'
})
export class MapAuthorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
