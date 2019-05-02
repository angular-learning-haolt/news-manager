import { Component, OnInit,Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss']
})
export class TaxListComponent implements OnInit, OnChanges {
  @Input() allTaxes;
  @Input() editedTax;
  @Output() checkedTaxesEmit = new EventEmitter<any>();
  public checkedTaxes: number[] = [];
  public hasCheckAllTaxes =  false;
  @Output() idDeleteEmit = new EventEmitter<any>();
  @Output() editedTaxEmit = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.editedTax) {
        console.log('Edited Tax', this.editedTax);
        const updatedTax = this.allTaxes.filter((tax) => tax.id === this.editedTax.id)[0];
        updatedTax.name = this.editedTax.name;
        updatedTax.slug = this.editedTax.slug;
        console.log('Updated Tax', updatedTax);
        console.log('All Tax', this.allTaxes);
    }
  }
  onCheckTax(id: number) {
    const checkedTax = this.getTagById(id);
    checkedTax.hasChecked = !checkedTax.hasChecked;
    if (this.checkedTaxes.includes(id)) {
        this.checkedTaxes = this.checkedTaxes.filter(taxId => taxId !== id );
    } else {
        this.checkedTaxes.push(id);
    }
    if (this.checkedTaxes.length === 6) {
      this.hasCheckAllTaxes = true;
    } else if (this.checkedTaxes.length <= 6) {
        this.hasCheckAllTaxes = false;
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
      return tax;
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
  onQuickEdit(tax) {
    tax.isQuickEditStatus = !tax.isQuickEditStatus;
  }
  onSubmitEditedTax(editedTax) {
    this.editedTaxEmit.emit(editedTax);
  }
}
