import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
    public apiUrl = 'http://localhost:8080/news/';
    public errStatus: string;
    constructor(
        private http: HttpClient
    ) { }

    addNewMedia(selectedFile) {
        // tslint:disable-next-line: new-parens
        const formData = new FormData;
        formData.append('file', selectedFile, selectedFile.name);
        return this.http.post(
            this.buildUrl('wp-json/wp/v2/media/'),
            formData
        );
    }

    getAllMedia() {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/media/')
        );
    }

    getMediaByID(id: number) {
        return this.http.get<any>(
            this.buildUrl('wp-json/wp/v2/media/' + id)
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
