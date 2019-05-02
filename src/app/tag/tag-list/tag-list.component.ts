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
  public editedTax: any;
  constructor(
      private tagService: TagService
  ) { }

  ngOnInit() {
      this.getAllTags('', 1);
  }

  getAllTags(s, page) {
    this.tagService.getAllTags(s, page).subscribe(
        (data) => {
          this.allTags = data.data;
          this.allTags = this.allTags.map((tag)=> {
            tag.hasChecked = false;
            tag.isQuickEditStatus = false;
            return tag;
          });
          this.tagQuantity = data.tagQuantity;
          this.pageQuantity = Math.ceil(this.tagQuantity / 6);
          // console.log('Alltags: ' , this.allTags);
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
    if (this.action === 'delete' && this.checkedTaxes.length > 0) {
        console.log('Do action!!!');
        this.checkedTaxes.map((id) => {
        this.tagService.deleteTagById(id).subscribe(data => {
            this.getAllTags('', 1);
        });
      });
    }
  }

  onDeleteTagById(e) {
    const id = e;
    this.tagService.deleteTagById(id).subscribe(data => {
    //   console.log('Tags đã xóa: ' + id);
      this.getAllTags('', 1);
    });
    // console.log('Xóa ' + e);
  }

  onSearch(searchData) {
    // console.log(searchData);
    this.getAllTags(searchData.s, searchData.page)
  }
  onAddSuccess(e) {
    this.getAllTags('', 1);
  }
  onSubmitEditedTag(editedTag) {
      console.log('Send req update: ');
      console.log(editedTag);
      this.editedTax = editedTag;
      this.tagService.updateTag(editedTag.id, editedTag.name, editedTag.slug).subscribe(
          data => {
            //   console.log(data);
            // this.getAllTags('', 1);
          }
      );
  }
}
