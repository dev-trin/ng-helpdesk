import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-problems',
    templateUrl: './problems.component.html',
    styleUrls: [
        './problems.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss',
        '../../../../assets/charts/radial/css/radial.scss'
    ]
})
export class ProblemsComponent implements OnInit {

    constructor() {}

    ngOnInit(){}
}