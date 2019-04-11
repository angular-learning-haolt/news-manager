import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from './../shared/cookie.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public static currentTeamId : any;
  constructor(
    private cookieService: CookieService
  ) {
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let requestOption:any = {};
    const cookieToken  = this.cookieService.getCookie('token');
    if(cookieToken) {
      requestOption.setHeaders = {
        Authorization: `Bearer ${cookieToken}`
      }
    } 

    request = request.clone(requestOption); 
    return next.handle(request)
  }
}