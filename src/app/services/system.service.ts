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
        return this.http.get<any>(appConfig.apiUrl + '/system/findall')
        .map( res => {
            return res;
        });
    }

    deleteById(subject: string){
        return this.http.delete<any>(appConfig.apiUrl + '/system/dellistdata/' + subject)
            .map( res => {
                return res;
            });
    }

    updateSystem(model: any) {
        const obj = {
            subject: model.subject,
            date: model.date,
            edit: model.edit,
            items: model.items,
            description: model.description,
            _id: model._id
        };
        return this.http.post<any>(appConfig.apiUrl + '/system/update', obj)
            .map(( response: Response) => <any>response)
                .catch(this.handleError);
    }

    add(value: any) {
        let name = {name: value.name};
        return this.http.post<any>(appConfig.apiUrl + "/system/add", name)
            .map(( response: Response) => <any>response)
                .catch(this.handleError);
    }
    Delete(name: string) {
        return this.http.delete<any>(appConfig.apiUrl + "/system/delete/" + name)
            .map( res => {
                return res;
            });
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server Error');
    }
}