import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    public apiUrl = 'http://localhost:8080/news/';
    public errStatus: string;

    constructor(
        private http: HttpClient
    ) { }

    getAllTags() {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/tags'),
            // {
            //     params: this.buildParams({
            //         page,
            //         per_page: perPage,
            //         search: s,
            //         status
            //     }),
            //     observe: 'response'
            // }
            {
                observe: 'response'
            }
        )
        .pipe(
            map((response) => {
                const data = response.body;
                const tagQuantity = parseInt(response.headers.get('x-wp-total'), 10);
                // const pageQuantity = parseInt(response.headers.get('x-wp-totalpages'), 10); // X-WP-TotalPages
                return {
                    data,
                    tagQuantity
                    // pageQuantity
                };
            })
        );
    }

    deleteTagById(id: number) {
        return this.http.delete<any>(
            this.buildUrl('wp-json/wp/v2/tags/' + id)
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
