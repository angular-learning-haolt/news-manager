import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxSearchComponent } from './tax-search/tax-search.component';
import { TaxListComponent } from './tax-list/tax-list.component';
import { FormsModule } from '@angular/forms';
import { TaxActionComponent } from './tax-action/tax-action.component';
import { TaxQuickEditComponent } from './tax-quick-edit/tax-quick-edit.component';

@NgModule({
  declarations: [TaxSearchComponent, TaxListComponent, TaxActionComponent, TaxQuickEditComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [TaxSearchComponent, TaxListComponent, TaxActionComponent]
})
export class TaxonomyModule { }
