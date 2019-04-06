import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from './news.class';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

    public apiUrl = 'https://demo.crefox.com/news-sun-training/';
    public errStatus: string;
    public categories;
    public cardSbj: BehaviorSubject<any[] | null >;
    public result: BehaviorSubject<any | null >;
    public newsQuantity: BehaviorSubject<number>;
    public conditions: BehaviorSubject<any[]>;

    constructor(
        private http: HttpClient
    ) {
        this.cardSbj = new BehaviorSubject(null);
        this.result = new BehaviorSubject(null);
        this.newsQuantity = new BehaviorSubject(1);
        this.conditions = new BehaviorSubject([]);
    }

    addCard() {
        this.cardSbj.next(['So difficult :(( ']);
    }

    getCart() {
        return this.cardSbj;
    }

    getAllNewsByCondition() {
        return this.result;
    }

    getAllNews(
        page: number = 1,
        perPage: number = 6,
        s: string = '',
        status: string = 'publish',
        // categories: null | number
    ) {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/posts'),
            {
            params: this.buildParams({
                page,
                per_page: perPage,
                search: s,
                status,
                // categories
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
            this.buildUrl('wp-json/wp/v2/statuses')
        );
    }

    getAllNewsCategories() {
        return this.http.get<any>(
            this.buildUrl('/wp-json/wp/v2/categories')
        );
        // {
        // params: this.buildParams({
        // })
        // })
    }

    getCategoryByID(id: number) {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/categories/' + id)
        ).pipe(
            map( response => {
                return response.name;
            })
        );
    }

    getTagByID(id: number) {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/tags/' + id)
        ).pipe(
            map( response => {
                return response.name;
            })
        );
    }

    getAuthorByID(id: number) {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/users/' + id)
        ).pipe(
            map( response => {
                return response.name;
            })
        );
    }

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
