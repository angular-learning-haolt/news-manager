import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';

const categoryRoutes: Routes = [
    {
      path: '',
      component: CategoryComponent,
      children: [
          {
            path: '',
            component: CategoryListComponent
          }
        ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
