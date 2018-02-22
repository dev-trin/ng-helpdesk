import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';

@Injectable()
export class ForgotService {
    constructor(private http: HttpClient) { }

    forgot(email: string) {
        const data = {email: email};
        return this.http.post<any>(appConfig.apiUrl + '/users/forgot', data)
            .map(res=> {
                return res;
            });
    }
}