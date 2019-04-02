import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CookieService } from './../shared/cookie.service';

@Injectable({
    providedIn: 'root'
})

export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private cookieService: CookieService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const cookieToken  = this.cookieService.getCookie('token');
        if (cookieToken) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}
