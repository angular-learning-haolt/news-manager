import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagComponent } from './tag/tag.component';
import { TagListComponent } from './tag-list/tag-list.component';

const tagRoutes: Routes = [
  {
    path: '',
    component: TagComponent,
    children: [
        {
          path: '',
          component: TagListComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(tagRoutes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
