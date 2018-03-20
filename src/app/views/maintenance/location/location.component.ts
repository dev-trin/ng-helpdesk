import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormArray, Validators, FormsModule, FormBuilder, Form, NgForm  } from '@angular/forms';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LocationService } from '../../../services/index';
@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: [
        './location.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss'
      ],
      providers: [BsModalService]
})
export class LocationComponent implements OnInit {

    public result: Array<any>;
    modalRef: BsModalRef;
    form: FormGroup;
    public model: any;
    config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    }
    constructor(
        private http: HttpClient,
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        private locationService: LocationService
    ) {}

    ngOnInit():void {
        this.onLoad();
        this.result = [];
        this.form = this.formBuilder.group({
            name: [null, Validators.required]
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
        this.locationService.getAll()
            .subscribe(data => {
                this.result = data;
            });
    }

    openModal(location: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            location,Object.assign({}, this.config, {class: 'gray modal-lg'})
        );
    }

    onInsert(){
        console.log(this.form);
        this.locationService.create(this.form.value).subscribe(data=>{
            this.modalRef.hide();
            this.onLoad();
            this.form = this.formBuilder.group({
                name: [null],
            });
        }, err=> {
            console.log(err);
        });
    }

    editModal(editLine: TemplateRef<any>, line) {
        this.modalRef = this.modalService.show(
            editLine, Object.assign({}, this.config, {class: 'gray modal-lg'})
        );
        this.model = line;
    }

    onEdit(){
        this.locationService.update(this.model)
            .subscribe(data => {
                this.modalRef.hide();
                this.onLoad();
            });
    }

    del(_id: string) {
        this.locationService.delete(_id)
          .subscribe(data=> {
            this.onLoad();
          }, err => {
            console.log(err);
          });
    }
}