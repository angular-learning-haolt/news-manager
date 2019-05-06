import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsAddComponent } from './news-add/news-add.component';
import {CanDeactivateGuard} from './can-deactivate/can-deactivate.guard';
import { NewsTestComponent } from './news-test/news-test.component';

const newsRoutes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        component: NewsListComponent
      },
      {
        path: 'add',
        component: NewsAddComponent
      },
      {
        path: 'subscribe',
        component: NewsTestComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':slug-id',
        component: NewsDetailComponent,
        // canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
