import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapCategory'
})
export class MapCategoryPipe implements PipeTransform {

  transform(cateIDs: any[], args?: any): any {
    var _allCategories = JSON.parse(localStorage.getItem('categories'));
    var resultCategoryNames = [];
    cateIDs.map((cateID) => {
      if (cateID === 1) {
        resultCategoryNames.push('Uncategorized');
      } else {
        let cateName = _allCategories
                        .filter( cate => cate.id === cateID)
                        .map(cate => cate.name);
        resultCategoryNames.push(cateName);
      }
    });
    return resultCategoryNames
  }

}
