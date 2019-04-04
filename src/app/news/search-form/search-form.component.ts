import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { NewsService } from './../news.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

    public keywords = '';
    public newsStatuses:any= [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        // private subscription: Subscription
        private newsService: NewsService
    ) { }

    ngOnInit() {
        // this.subscription = this.activatedRoute.queryParams
        //     .subscribe(
        //         data => this.keywords = data.keywords
        // )
        this.activatedRoute.queryParams
            .subscribe(
                data => this.keywords = data.keywords
        );
        this.newsService.getAllNewsStatus()
            .subscribe(
                data => {
                    this.newsStatuses = data;
                    console.log(this.newsStatuses);
                }
        );
    }

    // Input: (ngModelChange)="onChange()"
    // onChange() {
    //     console.log(this.keywords);
    // }

    onSearch() {
        console.log(this.keywords);
    }
    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }
}
