import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tax-search',
  templateUrl: './tax-search.component.html',
  styleUrls: ['./tax-search.component.scss']
})
export class TaxSearchComponent implements OnInit {
    @Input() taxQuantity;
    @Input() pageQuantity;
    public page = 1;
    public action = '';
    public keywords = '';
  constructor() { }

  ngOnInit() {
    //   this.pageQuantity = Math.ceil(this.taxQuantity / 6);
  }

  goFirstPage() {
      this.page = 1;
  }

  goLastPage() {
    this.page = this.pageQuantity;
  }

  goPrevPage() {
    this.page = (this.page > 1 ) ? this.page - 1 : 1;
  }

  goNextPage() {
    this.page = (this.page < this.pageQuantity ) ? this.page + 1 : this.pageQuantity;
  }

  onSearch() {
    console.log(this.keywords, this.page);
  }
}
