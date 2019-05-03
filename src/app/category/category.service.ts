import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    public apiUrl = 'http://localhost:8080/news/';
    public errStatus: string;

    constructor(
        private http: HttpClient
    ) { }

    addNewCat(name: string, slug: string, parent: string) {
            let params = new HttpParams();
            params = params.append('name', name);
            if (slug) {
                params = params.append('slug', slug);
            }
            if (parent) {
                params = params.append('parent', parent);
            }
            return this.http.post<any>(
                this.buildUrl('wp-json/wp/v2/categories'),
                null,
                {
                    params
                }
            );

    }

    updateCat(id: number, name: string, slug: string) {
        return this.http.post<any>(
            this.buildUrl('wp-json/wp/v2/categories/' + id),
            null,
            { params: this.buildParams({
                            name,
                            slug
                    })
            }
        );
    }

    getAllCats(s: string, page: number = 1) {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/categories'),
            {
                params: this.buildParams({
                    page,
                    per_page: 6,
                    search: s
                }),
                observe: 'response'
            }
        )
        .pipe(
            map((response) => {
                const data = response.body;
                const catQuantity = parseInt(response.headers.get('x-wp-total'), 10);
                // const pageQuantity = parseInt(response.headers.get('x-wp-totalpages'), 10); // X-WP-TotalPages
                return {
                    data,
                    catQuantity
                    // pageQuantity
                };
            })
        );
    }

    deleteCatById(id: number) {
        return this.http.delete<any>(
            this.buildUrl('wp-json/wp/v2/categories/' + id),
            {
                params: this.buildParams({
                    force: true
                }),
                observe: 'response'
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
