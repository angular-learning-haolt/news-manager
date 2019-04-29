import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../news.service';
import { NewsAddFileComponent } from '../news-add-file/news-add-file.component';

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
  public status = 'public';
  public isValidTitle = true;

  public newsCategories: any = [];
  @ViewChild( NewsAddFileComponent ) newsAddFileComponent: NewsAddFileComponent;
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsService.getAllNewsCategories()
    .subscribe(
        data => {
          this.newsCategories = data;
          this.newsCategories.map((cate) => {
              cate.hasSelected = false;
              return cate;
          });
          console.log('Cates:', this.newsCategories);
        }
    );
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
  }

  onTitleChange() {
    this.isValidTitle = (this.title === '') ? true : false ;
  }

  onSelectCate(cate) {
    cate.hasSelected = true;
  }
  onOpenUploadFileModal() {
      this.newsAddFileComponent.showModal();
  }
}
