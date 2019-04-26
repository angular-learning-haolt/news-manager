import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  public allTags: any[];
  public tagQuantity: number;
  public pageQuantity: number;
  public checkedTaxes: number[] = [];
  public action: string;
  constructor(
      private tagService: TagService
  ) { }

  ngOnInit() {
      this.tagService.getAllTags().subscribe(
          (data) => {
            this.allTags = data.data;
            this.allTags = this.allTags.map((tag)=> {
              tag.hasChecked = false;
              return tag;
            });
            this.tagQuantity = data.tagQuantity;
            this.pageQuantity = Math.ceil(this.tagQuantity / 6);
            console.log('Alltags: ' , this.allTags);
          },
          (err) => {
              this.tagService.handleError(err);
          }
      );
  }

  onCheckTags(t) {
    this.checkedTaxes = t;
  }

  onDoAction(act) {
    this.action = act;
    // if (this.action === 'delete' && this.checkedTaxes.length > 0) {
      console.log('Do action!!!');
    //   this.checkedTaxes.map((id) => {
    //     this.deleteTag(id);
    //   })
    // }
  }

  onDeleteTagById(e) {
    let id = e;
    // this.tagService.deleteTagById(id).subscribe(data => {
    //   console.log('Tags đã xóa: ' + id);
    // });
    console.log('Xóa ' + e);
  }
}
