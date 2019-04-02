import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from './../shared/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navs: Array<{ title: string, route: string }>;
  public didLogin: boolean;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.navs = [
        {
        title: 'News',
        route: 'news'
        },
        {
        title: 'Login',
        route: 'login'
        }
    ];
    this.loginService.getStatusLogin().subscribe((data) => {
      console.log(data);
      this.didLogin = data;
    });
  }

  onLogOut() {
    this.cookieService.eraseCookie('token');
    this.loginService.changeStatusLogin(false);
    this.router.navigate(['login']);
  }
}
