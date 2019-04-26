import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { TagRoutingModule } from './tag-routing.module';
import { TagAddComponent } from './tag-add/tag-add.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TaxonomyModule } from '../taxonomy/taxonomy.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TagComponent, TagAddComponent, TagListComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    TaxonomyModule,
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
export class TagModule { }
