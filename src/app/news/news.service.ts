import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public apiUrl = 'https://demo.crefox.com/news-sun-training/';
  public errStatus: string;

  constructor(
       private http: HttpClient
  ) { }

  getAllNews() {
    return this.http.get<any>(
      this.buildUrl('wp-json/wp/v2/posts'),
      { params: this.buildParams({
        page: 1,
        per_page: 6
      })}
    );
  }

  getNewsByID(id: number) {
    return this.http.get<any>(
      this.buildUrl('wp-json/wp/v2/posts/' + id),
    //   { params: this.buildParams({
    //     id
    //   })}
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
