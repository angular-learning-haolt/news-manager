import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

    public apiUrl = 'https://demo.crefox.com/news-sun-training/';
    public errStatus: string;

    constructor(
        private http: HttpClient
    ) { }

    getAllNews(page: number, perPage: number) {
    return this.http.get<any>(
        this.buildUrl('wp-json/wp/v2/posts'),
        {
        params: this.buildParams({
            page,
            per_page: perPage
        }),
        observe: 'response'
        }
    ).pipe(
        map((response) => {
            const data = response.body;
            const newsQuantity = parseInt(response.headers.get('x-wp-total'), 10);
            return {
                data,
                postsQuantity: newsQuantity
            };
        })
    );
    }

    getAllNewsStatus() {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/statuses'),
            // {
            //     headers: this.buildHeader({
            //         token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGVtby5jcmVmb3guY29tXC9uZXdzLXN1bi10cmFpbmluZyIsImlhdCI6MTU1NDM0MTA5MSwibmJmIjoxNTU0MzQxMDkxLCJleHAiOjE1NTQ5NDU4OTEsImRhdGEiOnsidXNlciI6eyJpZCI6IjUifX19.nij2sxdZYmTDQGz_BrtmOXmQLB3UbKgHpe_FZnwwMSY'
            //     })
            // }
        )
        // {
        // params: this.buildParams({
        // })
        // })
    };

    getResponseHeader() {
        return this.http.get(
        this.buildUrl('wp-json/wp/v2/posts'),
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
