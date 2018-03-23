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
        let json = {
            name: value.name,
            address: value.address,
            tel: value.tel,
            fax: value.fax,
            email: value.email,
            contact: value.contact,
            district: value.district,
            subdistrict: value.subdistrict,
            province: value.province,
            zipcode: value.zipcode,
            note: value.note
        };
        return this.http.post<Supplier[]>(appConfig.apiUrl + '/supplier/insert', json)
            .map(res=>{
                return res;
            });
    }
}