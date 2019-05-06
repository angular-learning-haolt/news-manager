import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapAuthor'
})
export class MapAuthorPipe implements PipeTransform {
  transform(id: number) {
    const authors = JSON.parse(localStorage.getItem('authors'));
    const author = authors.filter(
        au => au.id === id
    )[0];
    return author.name;
  }

}
