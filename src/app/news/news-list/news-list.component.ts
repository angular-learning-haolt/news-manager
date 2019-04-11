import { Component, OnInit } from '@angular/core';
import { NewsService } from './../news.service';
import { News } from './../news.class';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  public news: any;
  public newsCategories: any = [];
  public newsCategoriesID: number[];
  public newsQuantity: number;

  public conditionOnSearch: any = {
      page: 1,
      perPage: 6,
      keywords: '',
      postStatus: 'publish',
      category: 0
  };

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.getAllNews();
    this.newsService.getAllNewsCategories()
        .subscribe(
            data => {
              this.newsCategories = data;
              console.log('Cates:', data);
              localStorage.setItem('categories', JSON.stringify(data));
            }
        );
    this.newsService.getAllNewsTags()
        .subscribe(
            data => {
              this.newsCategories = data;
              console.log('Tags:', data);
              localStorage.setItem('tags', JSON.stringify(data));
            }
        );

  }

  getAllNews() {
    this.newsService.getAllNews(
        this.conditionOnSearch.page,
        this.conditionOnSearch.perPage,
        this.conditionOnSearch.keywords,
        this.conditionOnSearch.postStatus,
        this.conditionOnSearch.category
    ).subscribe((data) => {
        console.log(data);
        this.news = data.data;
        this.newsQuantity = data.postsQuantity;
    });
  }

  onGetconditionOnSearch(value: { keywords: string; category: string | number; }) {
    if (value.keywords === undefined) {
        value.keywords = '';
    }
    value.category = +value.category;
    this.conditionOnSearch = value;
    console.log('Log tại onGetConditional: ', this.conditionOnSearch);
    this.getAllNews();
  }

  onDeleteItem(id) {
    const ans = confirm('Xóa nhé?');
    if (ans) {
      this.newsService.deleteNewsByID(id).subscribe((data) => {
        console.log('NewsList đã xóa: ', data);
        this.getAllNews();
      });
    }
  }
  onCheckItem(id: number) {
    this.newsService.addToAllDeleteNews(id);
  }
}
