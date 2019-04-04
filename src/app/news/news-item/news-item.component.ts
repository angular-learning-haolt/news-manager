import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  constructor() { }
  @Input() item;
  @Input() i;
  ngOnInit() {
    console.log(this.item);
  }

}
