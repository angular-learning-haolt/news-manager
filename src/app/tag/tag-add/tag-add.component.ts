import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {

  public name: string;
  public slug: string;
  @Output() hasAddSuccessEmit = new EventEmitter();
  constructor(
    private tagService: TagService
  ) {
  }

  ngOnInit() {
  }

  onAddTag() {
      if (this.checkSlug()) {
        console.log(this.name, this.slug);
        this.tagService.addNewTag(this.name, this.slug).subscribe(
          data => {
            console.log(data);
            this.hasAddSuccessEmit.emit(true);
          }
        );
      }
  }

  checkSlug() {
    if (this.name ) {
        return true;
    }
    return false;
  }
}
