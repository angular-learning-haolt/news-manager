import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    public action: string;
    public allCats: any[];
    public catQuantity: number;
    public pageQuantity: number;
    public checkedTaxes: number[] = [];
    public editedTax: any;
    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.getAllCats('', 1);
    }

    getAllCats(s, page) {
        // this.categoryService.getAllCats().subscribe(
        //     data => {
        //         this.allCats = data.data;
        //         this.catQuantity = data.catQuantity;
        //         this.pageQuantity = Math.ceil(this.catQuantity / 6);
        //         console.log(data);
        //     },
        //     err => console.log(err)
        // );
        this.categoryService.getAllCats(s, page).subscribe(
            data => {
                this.allCats = data.data;
                this.catQuantity = data.catQuantity;
                this.pageQuantity = Math.ceil(this.catQuantity / 6);
                // console.log(data);
            },
            err => console.log(err)
        );
    }
    onDoAction(act) {
        this.action = act;
        if (this.action === 'delete') {
            // if (this.action === 'delete' && this.checkedTaxes.length > 0) {
            console.log('Do action!!!' + this.action);
            // this.checkedTaxes.map((id) => {
            //     this.tagService.deleteTagById(id).subscribe(data => {
            //         this.getAllTags('', 1);
            //     });
            // });
        }
    }
    onCheckTags(e) {

    }
    onDeleteTagById(id: number) {
        this.categoryService.deleteCatById(id).subscribe(
            data => {
                // console.log(data);
                this.getAllCats('', 1);
            },
            err => console.log(err)
        );
    }
    onSubmitEditedCat(editedcat) {
        // console.log(editedcat);
        this.editedTax = editedcat;
        this.categoryService.updateCat(editedcat.id, editedcat.name, editedcat.slug).subscribe(
            data => {
                // console.log(data);
                // this.getAllCats('', 1);
            },
            err => console.log(err)
        );
    }
    onSearch(searchData) {
        this.getAllCats(searchData.s, searchData.page);
    }
}
