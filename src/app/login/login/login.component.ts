import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { LoginService } from './../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLogin = false;
  public errUserNameValidate = false;
  public errPasswordValidate = false;
  public hasErrorAfterRequest = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService) { }

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
      this.loginService.sẹndRequestToGetToken(user).subscribe(
        data => {
          console.log(data);
          this.isLogin = true;
        },
        error => {
          this.loginService.handleError(error);
          this.isLogin = false;
          this.hasErrorAfterRequest = true;
        }
      );
    }
  }
  resetErr() {
    this.errUserNameValidate = false;
    this.errPasswordValidate = false;
    this.hasErrorAfterRequest = false;
  }
}
