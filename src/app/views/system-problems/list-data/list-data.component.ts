import { Component, OnInit, ViewChild, ElementRef,TemplateRef  } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders, HttpRequest  } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators, FormsModule, FormBuilder, Form, NgForm  } from '@angular/forms';

import * as _ from 'underscore';
import { PagerService, SystemService } from '../../../services/index';
import { dateFormatPipe } from '../../../pipe/date-format-pipe';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { appConfig } from '../../../app.config';


@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: [
      './list-data.component.scss',
      '../../../../assets/icon/icofont/css/icofont.scss'
    ],
    providers: [dateFormatPipe,BsModalService]
  })
  export class ListDataComponent implements OnInit {

    private allItems: Array<any>;

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    modalRef: BsModalRef;
    model: any;
    config = {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: false
    };
    private selectArr: Array<any>;

    constructor(private http: HttpClient, 
      private pagerService: PagerService, 
      private formBuilder: FormBuilder,
      private modalService: BsModalService,
      private systemService: SystemService,private router: Router){}

    ngOnInit(): void{
      this.onLoad();
      this.onSelect();
      this.allItems = [];
    }

    

    onLoad(){
      this.systemService.findAll()
        .subscribe(data => {
          console.log(data);
          this.allItems = data;
          this.setPage(1);
        }, err => {
          console.log(err);
        });
    }

    onSelect(){
      this.http.get<any[]>(appConfig.apiUrl + "/system/show")
          .subscribe(res => {
              this.selectArr = res;
            
          }, err => {
              console.log(err);
          });
  }

    setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      // get pager object from service
      this.pager = this.pagerService.getPager(this.allItems.length, page);

      // get current page of items
      this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

    del(subject: string) {
        this.systemService.deleteById(subject)
          .subscribe( data => {
            console.log(data);
            this.onLoad();
          }, err => {
            console.log(err);
          });
    }

    openModal(template: TemplateRef<any>, line) {
      this.modalRef = this.modalService.show(
        template,Object.assign({}, this.config, { class: 'gray modal-lg' })
      );
      this.model = line;
      console.log("openModal" , this.model);
    }

    onSubmit() {
      
      console.log(this.model);
     
      this.systemService.updateSystem(this.model)
        .subscribe( data => {
            this.modalRef.hide();
            this.onLoad();
        }, err=> { console.log(err)});
    }

   
  }