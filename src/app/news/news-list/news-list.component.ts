import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from './../news.service';
import { News } from './../news.class';
import { NewsFormConfirmComponent } from './../news-form-confirm/news-form-confirm.component';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})

export class NewsListComponent implements OnInit {

  @ViewChild( NewsFormConfirmComponent ) newsFormConfirmComponent: NewsFormConfirmComponent
  public news: any;
  public newsCategories: any = [];
  public newsCategoriesID: number[];
  public newsQuantity: number;
  public allDeleteNews: number[] = [];
  public openModalConfirmDelete = false;
  public hasCheckAllItems = false;

  public conditionOnSearch: any = {
      page: 1,
      perPage: 6,
      keywords: '',
      postStatus: 'publish',
      category: 0
  };
  public hasPermanlyDelete = false;
  public deletePermanlyID: number;
  public deletePermanlyNews: any;
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
        this.news = data.data;
        console.log('Line 61', this.news);
        this.news = this.news.map((item)=> {
          item.hasChecked = false;
          return item
        });
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

  onCheckAllItems() {
    this.hasCheckAllItems = !this.hasCheckAllItems;
    this.news = this.news.map((item)=> {
        item.hasChecked = this.hasCheckAllItems;
        return item;
    });
    if (this.hasCheckAllItems) {
        this.news.map((item) => {
            this.allDeleteNews.push(item.id);
        });
    } else {
        this.allDeleteNews = [];

    }
    console.log('onCheckAllItems: ', this.allDeleteNews);
  }

  onDeleteItem(id) {
    // const ans = confirm('Xóa nhé?');
    this.newsService.deleteNewsByID(id).subscribe((data) => {
      console.log('NewsList đã xóa: ', data);
      this.getAllNews();
    });
  }

  onCheckItem(id: number) {
    // UI
    const news = this.news.filter((item) => item.id === id );
    news[0].hasChecked = (news[0].hasChecked) ? false : true;
    // LOGIC
    if (this.allDeleteNews.includes(id)) {
        this.allDeleteNews = this.allDeleteNews.filter(newsId => newsId !== id );
    } else {
        this.allDeleteNews.push(id);
    }
    this.hasCheckAllItems = (this.allDeleteNews.length === 6) ? true : false;
    console.log('onCheckItem: ', this.allDeleteNews);
  }

  onGetBulkAction(val) {
    if (val === 'delete') {
        this.allDeleteNews.map((id) => {
            this.onDeleteItem(id);
            if (this.allDeleteNews.includes(id)) {
                this.allDeleteNews = this.allDeleteNews.filter(newsId => newsId !== id );
            }
            console.log(this.allDeleteNews);
        });
    }
  }
  onClickPermanlyDelete(item, id) {
    this.deletePermanlyNews = item;
    this.newsFormConfirmComponent.showModal();
    this.deletePermanlyID = id;
  }

  onPermanlyDelete(val) {
    this.newsService.deletePermanlyNewsByID(this.deletePermanlyID).subscribe(
        (data) => {
            console.log(data);
            this.getAllNews();
        }
    );
    this.newsFormConfirmComponent.closeModal();
  }
}
