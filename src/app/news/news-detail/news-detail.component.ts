import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from './../news.service';
import { News } from '../news.class';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  public curentNews: News;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit() {
      this.getCurrentRestaurant();
  }
  getCurrentRestaurant() {
    const curentID =  this.getIDOnURL();
    this.newsService.getNewsByID(curentID).subscribe(
      data => {
        console.log(data);
        this.curentNews = data;
      },
      error => {
        this.newsService.handleError(error);
      }
    );
  }

  private getIDOnURL() {
    const curentPath = this.activatedRoute.snapshot.params['slug-id'];
    const curentID = + curentPath.substring(curentPath.lastIndexOf('-') + 1, curentPath.length);
    return curentID;
  }

  onEdit() {}
  onDelete() {}
}
