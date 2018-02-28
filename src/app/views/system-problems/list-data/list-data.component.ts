import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as _ from 'underscore';
import { PagerService, SystemService } from '../../../services/index';
import { dateFormatPipe } from '../../../pipe/date-format-pipe';

@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: [
      './list-data.component.scss',
    ],
    providers: [dateFormatPipe]
  })
  export class ListDataComponent implements OnInit {

    private allItems: Array<any>;

    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];


    constructor(private http: HttpClient, private pagerService: PagerService, private systemService: SystemService){}

    ngOnInit(): void{
      this.onLoad();
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

    setPage(page: number) {
      if(page < 1 || page > this.pager.totalPages) {
        return;
      }

      // get pager object from service
      this.pager = this.pagerService.getPager(this.allItems.length, page);

      // get curretn page of items
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

    edit(_id: string) {}
  }