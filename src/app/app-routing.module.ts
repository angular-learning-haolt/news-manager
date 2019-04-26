import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

import { LoginGuard } from './login/login.guard';
import { ContinueLoginGuard } from './login/continue.login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [
      ContinueLoginGuard
    ]
    // canActivate: [
    //   !LoginGuard
    // ]
    // Expect: Nếu Login rồi (lưu token rồi)
    // thì ko cho vào route này nữa :V thay vì tạo 1 Guard khác thì có cách nào ko nhỉ?)
  },
  {
    path: 'news',
    loadChildren: './news/news.module#NewsModule',
    canActivate: [
      LoginGuard
    ]
  },
  {
    path: 'tag',
    loadChildren: './tag/tag.module#TagModule',
    canActivate: [
      LoginGuard
    ]
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule',
    canActivate: [
      LoginGuard
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
