import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from './../news.service';

@Component({
  selector: 'app-news-quick-edit',
  templateUrl: './news-quick-edit.component.html',
  styleUrls: ['./news-quick-edit.component.scss']
})
export class NewsQuickEditComponent implements OnInit {

  @Input() editItem;
  public title = '';
  public slug = '';
  public cateID = 0;
  public newsCategories: any = [];
  // public newsCategoriesID: number[];

  constructor(
    private newsService: NewsService
  ) { }
  ngOnInit() {
    this.title = this.editItem.title.rendered;
    this.slug = this.editItem.slug;
    this.cateID = this.editItem.categories[0];
    this.newsService.getAllNewsCategories()
      .subscribe(
          data => {
              this.newsCategories = data;
              // this.newsCategoriesID = data.map((cat) => cat.id);
          }
      );
    console.log(this.editItem);
  }
  onUpdateNews() {
    console.log('Sửa ra như này hả: ', this.title, this.slug, this.cateID);
  }
  onCancel() {
    this.editItem.isQuickEditStatus = false;
  }
}
