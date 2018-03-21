import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormArray, Validators, FormsModule, FormBuilder, Form, NgForm  } from '@angular/forms';

import { EquipmentService } from '../../../services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: [
      './equipment.component.scss',
      '../../../../assets/icon/icofont/css/icofont.scss'
    ],
    providers: [BsModalService]
  })
export class EquipmentComponent implements OnInit {

    private result: Array<any>;
    modalRef: BsModalRef;
    model: any;
    form: FormGroup;
    config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    };

    constructor(private http: HttpClient,
        private formBuilder: FormBuilder,
        private equipmentService: EquipmentService,
        private modalService: BsModalService){}

    ngOnInit(): void{
        this.onLoad();
        this.result = [];
        this.form = this.formBuilder.group({
            name: [null, Validators.required]
        });
    }

    onLoad(){
        this.equipmentService.getAll()
            .subscribe(data=> {
                this.result = data;
            }, err=> {
                console.log(err);
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

    openModal(equipment: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            equipment, Object.assign({}, this.config, {class: 'gray modal-lg'})
        );
    }

    editModal(editLine: TemplateRef<any>, line) {
        this.modalRef = this.modalService.show(
          editLine, Object.assign({}, this.config, {class: 'gray modal-lg'})
        );
      
        this.model = line;
        console.log("editmodal", this.model);
    }

    onInsert(){
        this.equipmentService.create(this.form.value)
            .subscribe(data=> {
                this.modalRef.hide();
                this.onLoad();
                this.form = this.formBuilder.group({
                    name: [null]
                });
            },err=>{
                console.log(err);
            });
    }

    del(_id:string) {
        this.equipmentService.delete(_id)
            .subscribe(data=> {
                this.onLoad();
            });
    }

    onEdit(){
        this.equipmentService.update(this.model)
            .subscribe(data=> {
                this.modalRef.hide();
                console.log(data);
                this.onLoad();
            });
    }
}