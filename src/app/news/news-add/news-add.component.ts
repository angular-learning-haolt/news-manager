import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../news.service';
import { NewsAddFileComponent } from '../news-add-file/news-add-file.component';
import { Router } from '@angular/router';
// import { FormCanDeactivateCustom } from '../form-can-deactivate-custom/form-can-deactivate-custom';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {

  public htmlContent = '';
  public title = '';
  public cates = [];
  public excerpt = '';
  public imgUrl;
  public tags: string[];
  public status = 'publish';
  public isValidTitle = true;
  public hasAddNewsSuccessAlert = false;

  public newsCategories: any = [];
  @ViewChild( NewsAddFileComponent ) newsAddFileComponent: NewsAddFileComponent;

  constructor(
    private newsService: NewsService
    // private router: Router
  ) {
    // super();
  }

  ngOnInit() {
    this.newsService.getAllNewsCategories()
      .subscribe(
          data => {
            this.newsCategories = data;
            this.newsCategories.map((cate) => {
                cate.hasSelected = false;
                return cate;
            });
            // console.log('Cates:', this.newsCategories);
          }
      );
  }
  private resetData() {
    this.htmlContent = '';
    this.title = '';
    this.cates = [];
    this.excerpt = '';
    this.imgUrl;
    this.tags = [];
    this.status = 'publish';
    this.isValidTitle = true;
  }

  onPublish() {
    console.log('Title: ', this.title);
    console.log('Content: ', this.htmlContent);
    console.log('Status: ', this.status);
    console.log('Excerpt: ', this.excerpt);
    this.cates = this.newsCategories
                .filter((cate) => cate.hasSelected === true )
                .map((cat) => cat.id );
    console.log('Cates: ', this.cates);
    //   console.log(this.tags);
    this.newsService.addNewNews(this.title, this.htmlContent, this.status, this.excerpt).subscribe(
        data => {
            console.log(data);
        },
        err => {
            console.log(err);
        }
    );
    this.resetData();
    // this.router.navigate(['news']);
    this.hasAddNewsSuccessAlert = true;
    setTimeout(
        () => {
            this.hasAddNewsSuccessAlert = false;
        },
        2000
    );
  }

  onTitleChange() {
    this.hasAddNewsSuccessAlert = false;
    this.isValidTitle = (this.title === '') ? true : false ;
  }

  onSelectCate(cate) {
    cate.hasSelected = true;
  }
  onOpenUploadFileModal() {
      this.newsAddFileComponent.showModal();
  }
}
