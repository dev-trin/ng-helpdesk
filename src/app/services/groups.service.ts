import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpRequest , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { appConfig } from '../app.config';
import { Group } from '../models/schema';

@Injectable()
export class GroupsService {

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Group[]>(appConfig.apiUrl + '/groups/show')
            .map(res=> {
                return res;
            });
    }

    create(value: any) {
        let data = {
            group: value.group,
            department: value.department
        };
        return this.http.post<Group[]>(appConfig.apiUrl + '/groups/insert', data)
            .map( res => {
                return res;
            });
    }

    update(model: any) {
        let obj = {
            group: model.group,
            department: model.department,
            _id: model._id
        };
        return this.http.post<any>(appConfig.apiUrl + '/groups/update', obj)
            .map( res => {
                return res;
            });
    }

    delete(_id: string) {
       
        return this.http.delete<any>(appConfig.apiUrl + '/groups/delete/' + _id)
            .map(data => {
                return data;
            });
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json() || 'Server Error');
    }
}