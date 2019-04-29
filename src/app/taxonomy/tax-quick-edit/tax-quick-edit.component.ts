import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tax-quick-edit',
  templateUrl: './tax-quick-edit.component.html',
  styleUrls: ['./tax-quick-edit.component.scss']
})
export class TaxQuickEditComponent implements OnInit {
  @Input() editTax;
  @Output() editedTaxEmit = new EventEmitter();
  public name = '';
  public slug = '';
  constructor() { }

  ngOnInit() {
      this.name = this.editTax.name;
      this.slug = this.editTax.slug;
  }
  onUpdateTax() {
    // console.log(this.name, this.slug);
    if (this.name === '' || (this.name === this.editTax.name && this.slug === this.editTax.slug)) {
    } else {
        this.editedTaxEmit.emit({
            id: this.editTax.id,
            name: this.name,
            slug: this.slug
        });
    }
    this.editTax.isQuickEditStatus = false;
  }

  onCancel() {
    this.editTax.isQuickEditStatus = false;
  }
}
