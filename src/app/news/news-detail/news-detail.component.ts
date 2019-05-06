import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from './../news.service';
import { MediaService } from './../media.service';
import { News } from '../news.class';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  public curentNews: News;
  public curentNewsImgUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private mediaService: MediaService
  ) { }

  ngOnInit() {
      this.getCurrentRestaurant();
  }
  getCurrentRestaurant() {
    const curentID =  this.getIDOnURL();
    this.newsService.getNewsByID(curentID).subscribe(
      data => {
        // console.log(data);
        this.curentNews = data;
        let curentNewsImgID = data.featured_media;
        if (curentNewsImgID) {
          this.mediaService.getMediaByID(curentNewsImgID).subscribe(
            data => {
              this.curentNewsImgUrl = data.source_url;
            },
            error => {
              this.newsService.handleError(error);
            }
          );
        }
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
