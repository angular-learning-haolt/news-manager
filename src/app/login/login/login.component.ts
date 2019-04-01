import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLogin = false;
  public errUserNameValidate = false;
  public errPasswordValidate = false;

  constructor( private fb: FormBuilder ) { }
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  ngOnInit() { }
  onLogin() {
    if (this.loginForm.invalid) {
      this.errUserNameValidate = (this.loginForm.value.username === '') ? true : false;
      this.errPasswordValidate = (this.loginForm.value.password === '') ? true : false;
    } else {
      this.isLogin = true;
      const user = this.loginForm.value;
      console.log(user);
    }
  }
  resetErr() {
    this.errUserNameValidate = false;
    this.errPasswordValidate = false;
  }
}
