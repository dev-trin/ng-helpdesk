import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormArray, Validators, FormsModule, FormBuilder, Form, NgForm  } from '@angular/forms';

import { GroupsService } from '../../../services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { appConfig } from '../../../app.config';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: [
      './groups.component.scss',
      '../../../../assets/icon/icofont/css/icofont.scss'
    ],
    providers: [BsModalService]
  })
  export class GroupsComponent implements OnInit {

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
      private groupService: GroupsService,
      private router: Router,
      private modalService: BsModalService){}

  ngOnInit(): void{
      this.onLoad();
      this.result = [];
      this.form = this.formBuilder.group({
        group: [null, Validators.required],
        department: [null, Validators.required]
      });
  }

  onLoad() {
    this.groupService.getAll()
      .subscribe(data => {
        console.log(data);
        this.result = data;
      }, err => {
        console.log(err);
      });
  }

  

  onInsert(){
    this.groupService.create(this.form.value)
      .subscribe(data=> {
        this.modalRef.hide();
        this.onLoad();
        this.form = this.formBuilder.group({
          group: [null],
          department: [null]
        });
      }, err => {
        console.log(err);
      });
  }

  del(_id: string) {
    this.groupService.delete(_id)
      .subscribe(data=> {
        this.onLoad();
      }, err => {
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

  openModal(group: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      group, Object.assign({}, this.config, {class: 'gray modal-lg'})
    );
  }

  editModal(editLine: TemplateRef<any>, line) {
    this.modalRef = this.modalService.show(
      editLine, Object.assign({}, this.config, {class: 'gray modal-lg'})
    );
  
    this.model = line;
    console.log("editmodal", this.model);
  }

  onEdit() {
    console.log(this.model);
    this.groupService.update(this.model)
      .subscribe(data=> {
        this.modalRef.hide();
        this.onLoad();
      });
  }
}