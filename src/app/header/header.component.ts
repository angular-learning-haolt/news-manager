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

  constructor(
    public cookieService: CookieService,
    public router: Router,
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
  // this.loginService.getStatusLogin().subscribe((data) => {
  // this.hasLogin = data;
  // });
  }

  onLogOut() {
    this.cookieService.eraseCookie('token');
    this.router.navigate(['login']);
  }
}
