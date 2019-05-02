import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';
import { CategoryListComponent } from './category-list/category-list.component';
import { TaxonomyModule } from '../taxonomy/taxonomy.module';
import { FormsModule } from '@angular/forms';
import { CategoryAddComponent } from './category-add/category-add.component';

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent, CategoryAddComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    TaxonomyModule,
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
export class CategoryModule { }
