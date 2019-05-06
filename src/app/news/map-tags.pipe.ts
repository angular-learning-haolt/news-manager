import { Pipe, PipeTransform } from '@angular/core';
import { NewsService } from './news.service';

@Pipe({
  name: 'mapTags'
})
export class MapTagsPipe implements PipeTransform {
  constructor(
    private newsService: NewsService
  ) {

  }
  transform(tagIDs: number[], args?: any): any {
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
    // var resultTagNames = [];
    // if (tagIDs.length !== 0) {
    //   tagIDs.map((tagID) => {
    //     this.newsService.getTagByID(tagID).subscribe(
    //       data => {
    //         console.log(data.name);
    //         resultTagNames.push(data.name);
    //       }
    //     );
    //     return resultTagNames
    //   });
    // }
    // else {
    //   resultTagNames.push('No Tags !');
    // }
    return resultTagNames
  }

}
