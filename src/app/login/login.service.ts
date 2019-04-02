import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public apiUrl = 'https://demo.crefox.com/news-sun-training/';
  public errStatus: string;
  public didLogin: BehaviorSubject< boolean >;

  constructor(
       private http: HttpClient
  ) {
    this.didLogin = new BehaviorSubject(false);
  }

  sẹndRequestToGetToken(user): Observable<any> {
    return this.http.post(
         this.buildUrl('wp-json/jwt-auth/v1/token'),
      {
        username: user.username, // 'le.thi.hao', // ,  le.thi.hao
        password: user.password   // user.password  'Aa@123456'
      },
      {
        headers: this.buildHeader()
      }
    );
  }

  handleError(err) {
    if (err.error instanceof Error) {
      console.log(`Client side Error: ${ err.error.message }`);
    } else {
      this.errStatus = err.status;
      console.log(this.errStatus);
    }
  }

  changeStatusLogin(val) {
    this.didLogin.next(val);
  }

  getStatusLogin() {
    return this.didLogin;
  }

  // build header for request
  private buildHeader(): HttpHeaders {
    const header = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    return header;
  }

  private buildParams(paramsData): HttpParams {
    const params = new HttpParams({ fromObject: paramsData });
    return params;
  }
  // build url for request
  private buildUrl(endpoint: string): string {
    return this.apiUrl + endpoint;
  }
}
