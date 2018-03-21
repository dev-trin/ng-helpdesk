import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpRequest , HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { appConfig } from '../app.config';
import { Equipment } from '../models/schema';

@Injectable()
export class EquipmentService {

    constructor(private http: HttpClient){}

    getAll() {
        return this.http.get<Equipment[]>(appConfig.apiUrl + '/equipment/all')
            .map(res=> {
                return res;
            });
    }

    create(value: any) {
        let obj = {name: value.name};
        return this.http.post<Equipment[]>(appConfig.apiUrl + '/equipment/insert', obj)
            .map( res => {
                return res;
            });

    }

    update(model: any) {
        let json = {name: model.name, _id: model._id};
        return this.http.post<Equipment[]>(appConfig.apiUrl + '/equipment/update', json)
            .map(res=> {
                return res;
            });
    }

    delete(_id: string) {
        return this.http.delete<any>(appConfig.apiUrl + '/equipment/delete/' + _id)
            .map(res=> {
                return res;
            });
    }
}