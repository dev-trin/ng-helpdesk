import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
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

    constructor() {}

    ngOnInit():void {
        
    }
}