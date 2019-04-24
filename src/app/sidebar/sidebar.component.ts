import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from './../shared/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
          title: 'Categories',
          route: 'category'
          },
          {
            title: 'Tags',
            route: 'tag'
          }
      ];
      this.loginService.getStatusLogin().subscribe((data) => {
        console.log(data);
        this.didLogin = data;
      });
    }

}
