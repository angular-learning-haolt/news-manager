import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';
import { FormsModule } from '@angular/forms';

import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ExcerptPipe } from './excerpt.pipe';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { MapCategoryPipe } from './map-category.pipe';
import { MapTagsPipe } from './map-tags.pipe';
import { MapAuthorPipe } from './map-author.pipe';
import { PageQuantityPipe } from './page-quantity.pipe';

@NgModule({
  declarations: [NewsComponent, NewsListComponent, ExcerptPipe, NewsDetailComponent, SearchFormComponent, NewsItemComponent, MapCategoryPipe, MapTagsPipe, MapAuthorPipe, PageQuantityPipe],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class NewsModule { }
