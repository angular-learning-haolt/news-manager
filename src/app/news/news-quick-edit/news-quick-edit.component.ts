import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() editItemEmit = new EventEmitter();

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
          }
      );
    console.log(this.editItem);
  }

  onUpdateNews() {
    this.editItemEmit.emit({
        id: this.editItem.id,
        title: this.title,
        catID: this.cateID
    });
    this.editItem.isQuickEditStatus = false;
    this.newsService.updateNews(this.editItem.id, this.title, this.slug, this.cateID)
        .subscribe((data) => {
        });
  }

  onCancel() {
    this.editItem.isQuickEditStatus = false;
  }
}
