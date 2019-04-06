import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapTags'
})
export class MapTagsPipe implements PipeTransform {

  transform(tagIDs: any[], args?: any): any {
    var resultTagNames = [];
    if (tagIDs.length !== 0) {
      var _allTags = JSON.parse(localStorage.getItem('tags'));
      tagIDs.map((tagID) => {
        let tagName = _allTags
                        .filter( tag => tag.id === tagID)
                        .map(tag => tag.name);
        resultTagNames.push(tagName);
      });
    }
    else {
      resultTagNames.push('No Tags !');
    }
    return resultTagNames
  }

}
