import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';

const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
