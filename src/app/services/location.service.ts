import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpRequest , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { appConfig } from '../app.config';
import { Location } from '../models/schema';

@Injectable()
export class LocationService {

    constructor(private http: HttpClient){}

    getAll(){
        return this.http.get<Location[]>(appConfig.apiUrl + '/location/show')
            .map(res=> {
                return res;
            });
    }

    create(value: any) {
        let data = {name: value.name};
        return this.http.post<Location[]>(appConfig.apiUrl + '/location/insert', data)
            .map(res=> {
                return res;
            });
    }

    update(model: any) {
        let obj = {name: model.name, _id: model._id};
        return this.http.post<Location[]>(appConfig.apiUrl + '/location/update', obj)
            .map(res=>{
                return res;
            });
    }

    delete(_id: string) {
        return this.http.delete<any>(appConfig.apiUrl + '/location/delete/' + _id)
            .map(res=> {
                return res;
            });
    }
}