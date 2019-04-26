import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent implements OnInit {
  @Input() allTaxes;
  @Output() checkedTaxesEmit = new EventEmitter<any>();
  public checkedTaxes: number[] = [];
  public hasCheckAllTaxes =  false;
  @Output() idDeleteEmit = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onCheckTax(id: number) {
    let checkedTax = this.getTagById(id);
    checkedTax.hasChecked = !checkedTax.hasChecked;
    if (this.checkedTaxes.includes(id)) {
        this.checkedTaxes = this.checkedTaxes.filter(taxId => taxId !== id );
    } else {
        this.checkedTaxes.push(id);
    }
    if (this.checkedTaxes.length === 6) {
      this.hasCheckAllTaxes = true;
    }
    // console.log(this.checkedTaxes);
    this.checkedTaxesEmit.emit(this.checkedTaxes);
  }

  private getTagById(id: number) {
    return this.allTaxes.filter(tax => tax.id === id )[0];
  }

  onCheckAllTaxes() {
    this.hasCheckAllTaxes = !this.hasCheckAllTaxes;
    this.allTaxes.map((tax) => {
      tax.hasChecked = this.hasCheckAllTaxes;
      return tax
    });
    if (this.hasCheckAllTaxes) {
        this.allTaxes.map((item) => {
          if (!this.checkedTaxes.includes(item.id)) {
            this.checkedTaxes.push(item.id);
          }
        });
    } else {
        this.checkedTaxes = [];
    }
    // console.log(this.checkedTaxes);
    this.checkedTaxesEmit.emit(this.checkedTaxes);
  }

  onDeleteTax(id: number) {
    this.idDeleteEmit.emit(id);
  }
}
