import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { appConfig } from '../app.config';
import { Supplier } from '../models/schema';

@Injectable()
export class SupplierService {

    constructor(private http: HttpClient){}

    all() {
        return this.http.get<Supplier[]>(appConfig.apiUrl + '/supplier/all')
            .map( res => {
                return res;
            });
    }

    create(value: any){
        const json = {
            name: value.name,
            address: value.address,
            subdistrict: value.subdistrict,
            district: value.district,
            province: value.province,
            zipcode: value.zipcode,
            tel: value.tel,
            fax: value.fax,
            email: value.email,
            contact: value.contact,
            note: value.note
        };
        return this.http.post<Supplier[]>(appConfig.apiUrl + '/supplier/insert', json)
            .map(res=>{
                return res;
            });
    }

    update(model: any) {
        let obj = {
            name: model.name,
            address: model.address,
            subdistrict: model.subdistrict,
            district: model.district,
            province: model.province,
            zipcode: model.zipcode,
            tel: model.tel,
            fax: model.fax,
            email: model.email,
            contact: model.contact,
            note: model.note,
            _id: model._id
        };
        return this.http.post<Supplier[]>(appConfig.apiUrl + '/supplier/update', obj)
            .map(res=> {
                return res;
            });
    }

    delete(_id: string) {
        return this.http.delete<any>(appConfig.apiUrl + '/supplier/delete/' + _id)
            .map( res=> {
                return res;
            });
    }
}