import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormArray, Validators, FormsModule, FormBuilder, Form, NgForm  } from '@angular/forms';

import { PagerService } from '../../../services/index';
import { dateFormatPipe } from '../../../pipe/date-format-pipe';
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
    providers: [dateFormatPipe,BsModalService]
  })
  export class GroupsComponent implements OnInit {

    
        constructor(
            private http: HttpClient,
            private formBuilder: FormBuilder,
            private pagerService: PagerService,
            private router: Router,
            private modalService: BsModalService
        ){}

        ngOnInit(): void{
            
        }
  }