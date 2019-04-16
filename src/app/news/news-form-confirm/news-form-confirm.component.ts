import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-news-form-confirm',
  templateUrl: './news-form-confirm.component.html',
  styleUrls: ['./news-form-confirm.component.scss']
})
export class NewsFormConfirmComponent implements OnInit {

  @Input() openModalConfirmDelete;
  @Input() deletePermanlyNews;

  @Output() hasPermalyDelete = new EventEmitter<boolean>();
  public _hasPermalyDelete = false;
  constructor() { }

  ngOnInit() { }

  showModal() {
    $('#exampleModal').modal('toggle');
  }

  closeModal() {
    $('#exampleModal').modal('hide');
  }

  onPermanlyDelete() {
    this._hasPermalyDelete = true;
    this.hasPermalyDelete.emit(this._hasPermalyDelete);
  }

}
