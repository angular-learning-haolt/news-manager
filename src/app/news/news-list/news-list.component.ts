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

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService.getAllNews().subscribe(
      data => {
        console.log(data);
        this.news = data;
      },
      error => {
        this.newsService.handleError(error);
      }
    );
  }

}
