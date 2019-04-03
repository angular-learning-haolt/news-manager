import { Component, OnInit } from '@angular/core';
import { NewsService } from './../news.service';
import { News } from './../news.class';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  public news: News[] = [];
  public newsQuantity: number;

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService.getAllNews(1, 6).subscribe(
      data => {
        console.log(data.data);
        this.news = data.data;
        this.newsQuantity = data.postsQuantity;
      },
      error => {
        this.newsService.handleError(error);
      }
    );
  }

}
