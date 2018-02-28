import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

import { appConfig } from '../app.config';

@Injectable()
export class SystemService {
    constructor(private http: HttpClient){}

    getAll(items: string, date: string, subject: string, edit: string,description: string, currenetUser: string) {
        var data = {
            items: items,
            date: date,
            subject: subject,
            edit: edit,
            description: description,
            currenetUser: currenetUser
        };
        return this.http.post<any>(appConfig.apiUrl + '/system/insert', data)
            .map( res => {
                return res;
            });
    }

    findAll() {
        return this.http.get<any>(appConfig.apiUrl + '/system/findall').map( res => {
            return res;
        });
    }

    deleteById(subject: string){
        return this.http.delete<any>(appConfig.apiUrl + '/system/dellistdata/' + subject)
            .map( res => {
                return res;
            });
    }

    updateArticle(_id: string) {
        
    }
}