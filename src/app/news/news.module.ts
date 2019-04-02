import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ExcerptPipe } from './excerpt.pipe';
import { NewsDetailComponent } from './news-detail/news-detail.component';

@NgModule({
  declarations: [NewsComponent, NewsListComponent, ExcerptPipe, NewsDetailComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpClientModule
  ]
})
export class NewsModule { }
