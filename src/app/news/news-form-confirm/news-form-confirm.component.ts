import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-news-form-confirm',
  templateUrl: './news-form-confirm.component.html',
  styleUrls: ['./news-form-confirm.component.scss']
})
export class NewsFormConfirmComponent implements OnInit, OnChanges {

  @Input() openModalConfirmDelete;
  constructor() { }

  ngOnInit() {
    console.log(this.openModalConfirmDelete);
  }
  ngOnChanges(): void {
    console.log(this.openModalConfirmDelete);
    // document.getElementById('exampleModal').modal('show');
  }

}
