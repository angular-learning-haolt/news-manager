import { Component, ViewChild } from '@angular/core';
import {FormCanDeactivate} from '../form-can-deactivate/form-can-deactivate';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-news-test',
  templateUrl: './news-test.component.html',
  styleUrls: ['./news-test.component.scss']
})
export class NewsTestComponent extends FormCanDeactivate {

  name: string;

  @ViewChild('form')
  form: NgForm;

  submit() {
   console.log(this.form.submitted);
  }

}
