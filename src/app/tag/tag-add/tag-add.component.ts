import { Component, OnInit, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {

  public name: string;
  public slug: string;
  public hasDisableBtn = true;
  @Output() hasAddSuccessEmit = new EventEmitter();
  constructor(
    private tagService: TagService
  ) {
  }

  ngOnInit() {
  }

  onChangeName() {
    this.hasDisableBtn = this.name ? false : true;
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
