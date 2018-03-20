import { Component, OnInit, TemplateRef, Input ,ViewEncapsulation} from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormArray, Validators, FormsModule, FormBuilder, Form, NgForm  } from '@angular/forms';

import { PagerService, SystemService } from '../../../services/index';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { appConfig } from '../../../app.config';


@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: [
        './system.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
      ],
    providers: [BsModalService]
})
export class SystemComponent implements OnInit {

    public result: Array<any>;
    modalRef: BsModalRef;
    form: FormGroup;
    public model: any;
    config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    };

    constructor(
        private http: HttpClient,
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        private systemService: SystemService
    ){}

    ngOnInit(): void{
        this.onLoad();
        this.result = [];
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
        });
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && this.form.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }

    onLoad(){
        this.http.get<any[]>(appConfig.apiUrl + "/system/show")
            .subscribe(res => {
                this.result = res;
            }, err => { console.log(err) });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,Object.assign({}, this.config, {class: 'gray modal-lg'})
        );
    }

    editModal(editLine: TemplateRef<any>, line) {
        this.modalRef = this.modalService.show(
            editLine, Object.assign({}, this.config, {class: 'gray modal-lg'})
        );
        
        this.model = line;
        console.log("editmodal", this.model);
    }

    del(name: string) {
        this.systemService.Delete(name)
            .subscribe(data=> {
                console.log(data);
                this.onLoad();
            }, err=> {
                console.log(err);
            });
    }

    onInsert(){
        console.log(this.form);
        this.systemService.add(this.form.value).subscribe(data=> {
            this.modalRef.hide();
            this.onLoad();
            this.form = this.formBuilder.group({
                name: [null],
                
            });
        }, err => {
            console.log(err);
        });
    }

    onEdit(){
        console.log(this.model);
        this.systemService.edit(this.model).subscribe(data=> {
            this.modalRef.hide();
            this.onLoad();
        }, err=> {
            console.log(err);
        });
    }
}