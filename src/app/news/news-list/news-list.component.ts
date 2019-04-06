import { Component, OnInit } from '@angular/core';
import { NewsService } from './../news.service';
import { News } from './../news.class';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  public news;
  public newsCategories: any = [];
  public newsCategoriesID: number[];
  public newsQuantity: number;

  public conditionOnSearch: any = {
      page: 1,
      perPage: 6,
      keywords: '',
      postStatus: 'publish'
  };

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
      this.getAllNews();
    // this.newsService.getAllNewsByCondition().subscribe(
    //   data => {
    //     this.news = data.data;
    //     this.newsQuantity = data.postsQuantity;
    //   },
    //   error => {
    //     this.newsService.handleError(error);
    //   }
    // );



    // this.newsService.getCategoryByID(2).subscribe(
    //   data => console.log(data),
    //   error => this.newsService.handleError(error)
    // );

    // this.newsService.getAllNewsCategories()
    //   .subscribe(
    //     data => {
    //       this.newsCategories = data;
    //       this.newsCategoriesID = data.map((cat) => cat.id);
    //     }
    // );

  }

  getAllNews() {
    this.newsService.getAllNews(
        this.conditionOnSearch.page,
        this.conditionOnSearch.perPage,
        this.conditionOnSearch.keywords,
        this.conditionOnSearch.postStatus,
        // this.conditionOnSearch.category
    )
    .subscribe(
        data => {
            this.news = data.data;
            this.newsQuantity = data.postsQuantity;
            console.log(this.news);
        },
        error => {
            this.newsService.handleError(error);
        }
    );
  }

  onGetconditionOnSearch(value) {
    // if (value.page < 0) {
    //     value.page = 1;
    // }
    if (value.keywords === undefined) {
        value.keywords = '';
    }
    if (value.category === '0') {
        delete value.category;
    } else {
        value.category = +value.category;
    }
    this.conditionOnSearch = value;
    console.log(this.conditionOnSearch);
    this.getAllNews();
  }
}
