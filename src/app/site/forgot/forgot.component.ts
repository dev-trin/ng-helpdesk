import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule,FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { ForgotService } from '../../services/index';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  email: FormControl;
  myform: FormGroup;
  msg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forpass: ForgotService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.email = new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
    ]);  
  }
  createForm() { 
    this.myform = new FormGroup({
      email: this.email,
    });
  }

  forgot(){
      this.forpass.forgot(this.myform.value.email)
        .subscribe(
          data => {
            console.log(data);
            if(data.msg === 'success') {
              this.msg = "success";
            }
          },error => {
            console.log(error);
          });
  }

}
