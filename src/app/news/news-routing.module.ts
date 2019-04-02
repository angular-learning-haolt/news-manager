import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';

const newsRoutes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        component: NewsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
