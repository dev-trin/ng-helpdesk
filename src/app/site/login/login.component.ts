import { NgModule, Pipe, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/index';
import { ReactiveFormsModule,FormsModule,FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  email: FormControl;
  password: FormControl;
  myform: FormGroup;
  msg: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

    ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      this.createFormControls();
      this.createForm();
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createFormControls(){
      this.email = new FormControl('', [
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
      ]);
      this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]);
      
  }

  createForm() { 
    this.myform = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }


  login() {
      this.loading = true;
      console.log(this.loading);
      console.log(this.myform);
      this.loading = true;
      this.authenticationService.login(this.myform.value.email, this.myform.value.password)
          .subscribe(
              data => {
                if(data) {
                  console.log("lcoal",localStorage.getItem('currentUser'));
                  this.router.navigate(['request/validation']);
                }
                if(data.status == "fail") {
                  this.msg = "fail";
                  console.log(data);
                  this.router.navigate(['/']);
                } else if(data.status == "exits") {
                  this.msg = "exits";
                  console.log(data);
                  this.router.navigate(['/']);
                }
                
              },
              error => {
                  this.loading = false;
              });
  }

}
