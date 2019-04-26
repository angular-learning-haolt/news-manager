import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {

  public name: string;
  public slug: string;

  constructor() { }

  ngOnInit() {
  }

  onAddTag() {
      if (this.checkSlug()) {
        console.log(this.name, this.slug);
      }
  }

  checkSlug() {
    if (this.name ) {
        return true;
    }
    return false;
  }
}
