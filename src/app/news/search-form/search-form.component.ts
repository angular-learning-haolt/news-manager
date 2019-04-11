import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from './../news.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

    public keywords = 'dfdgb';
    public status = 'publish';
    public newsStatuses: any = [];
    public newsCategories: any = [];
    public newsCategoriesID: number[];
    public selectedDate: '';
    public selectedCategory = '0';
    public page = 1;
    public action = '';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private newsService: NewsService
    ) { }

    @Output() conditionOnSearch = new EventEmitter<any>();
    @Input() newsQuantity;
    public pageQuantity;

    onSearch() {
        this.conditionOnSearch.emit(
            {
                page: this.page,
                perPage: 6,
                keywords: this.keywords,
                postStatus: this.status,
                category: this.selectedCategory
            }
        );
    }

    ngOnInit() {
        this.activatedRoute.queryParams
            .subscribe(
                data => this.keywords = data.keywords
            );
        this.newsService.getAllNewsCategories()
            .subscribe(
                data => {
                    this.newsCategories = data;
                    this.newsCategoriesID = data.map((cat) => cat.id);
                }
            );
        this.newsService.getAllDeleteNews().subscribe(data => console.log(data));
    }

    goToPreviousPage() {
        if (this.page > 1) {
            this.page -= 1;
        }
    }

    goToNextPage() {
        this.pageQuantity = this.newsQuantity / 6;
        if (this.page <= this.pageQuantity) {
            this.page += 1;
        }
    }

    ngOnDestroy(): void {
    }

    goToLastPage() {
        this.page = Math.ceil(this.newsQuantity / 6);
    }

    goToFirstPage() {
        this.page = 1;
    }
    onBulkActionChange(act) {
        this.action = act;
    }
    
    onBulkAction() {
        if(this.action === 'delete') {
            const ans = confirm('Xóa hết tất cả các News đã chọn nhé ?');
            console.log(ans);
        }
    }
}
