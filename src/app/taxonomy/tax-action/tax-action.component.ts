import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tax-action',
  templateUrl: './tax-action.component.html',
  styleUrls: ['./tax-action.component.scss']
})
export class TaxActionComponent implements OnInit {
  public action = '';
  constructor() { }
  @Output() actionEmit = new EventEmitter<any>();
  ngOnInit() {
  }

  getAction() {
    console.log(this.action);
  }
  onDoAction() {
      this.actionEmit.emit(this.action);
  }
}
