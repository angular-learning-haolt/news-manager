import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from './../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  public name: string;
  public parent;
  public slug;
  public hasDisableBtn = true;
  @Output() hasAddSuccessEmit = new EventEmitter<boolean>();
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }
  onAddCat() {
    console.log(this.name, this.slug, this.parent);
    this.categoryService.addNewCat(this.name, this.slug, this.parent).subscribe(
      data => {
        console.log(data);
        this.hasAddSuccessEmit.emit(true);
      }
    );
  }

  onChangeName() {
    this.hasDisableBtn = this.name ? false : true;
  }
}
