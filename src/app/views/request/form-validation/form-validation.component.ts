import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-form-validation',
    templateUrl: './form-validation.component.html',
    styleUrls: [
        './form-validation.component.scss',
        '../../../../assets/icon/icofont/css/icofont.scss',
        '../../../../assets/charts/radial/css/radial.scss'
      ],
})
export class FormValidationComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      subject: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      description: [null, Validators.required],

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

  onSubmit() {
    console.log("form", this.form);
    if(this.form.valid) {
      console.log('form submit');
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if(control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset(){
    this.form.reset();
  }
}