import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from './../news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit() {
      this.getCurrentRestaurant();
  }
  getCurrentRestaurant() {
    const curentPath = this.activatedRoute.snapshot.params['slug-id'];
    const curentID =  + curentPath.substring(curentPath.lastIndexOf('-') + 1, curentPath.length);
    console.log(curentID);
  }
}
