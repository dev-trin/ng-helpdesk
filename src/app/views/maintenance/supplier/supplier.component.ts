import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormArray, Validators, FormsModule, FormBuilder, Form, NgForm  } from '@angular/forms';

import { SupplierService } from '../../../services/index';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: [
    './supplier.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers: [BsModalService]
})
export class SupplierComponent implements OnInit {

  provices = [
    {name: 'กรุงเทพมหานคร'},
    {name: 'กระบี่'},
    {name: 'กาญจนบุรี'},
    {name: 'กาฬสินธุ์'},
    {name: 'กำแพงเพชร'},
    {name: 'ขอนแก่น'},
    {name: 'จันทบุรี'},
    {name: 'ฉะเชิงเทรา'},
    {name: 'ชลบุรี'},
    {name: 'ชัยนาท'},
    {name: 'ชัยภูมิ'},
    {name: 'ชุมพร'},
    {name: 'เชียงราย'},
    {name: 'เชียงใหม่'},
    {name: 'ตรัง'},
    {name: 'ตราด'},
    {name: 'ตาก'},
    {name: 'นครนายก'},
    {name: 'นครปฐม'},
    {name: 'นครพนม'},
    {name: 'นครราชสีมา'},
    {name: 'นครศรีธรรมราช'},
    {name: 'นครสวรรค์'},
    {name: 'นนทบุรี'},
    {name: 'นราธิวาส'},
    {name: 'น่าน'},
    {name: 'บึงกาฬ'},
    {name: 'บุรีรัมย์'},
    {name: 'ปทุมธานี'},
    {name: 'ประจวบคีรีขันธ์'},
    {name: 'ปราจีนบุรี'},
    {name: 'ปัตตานี'},
    {name: 'พระนครศรีอยุธยา'},
    {name: 'พังงา'},
    {name: 'พัทลุง'},
    {name: 'พิจิตร'},
    {name: 'พิษณุโลก'},
    {name: 'เพชรบุรี'},
    {name: 'เพชรบูรณ์'},
    {name: 'แพร่'},
    {name: 'พะเยา'},
    {name: 'ภูเก็ต'},
    {name: 'มหาสารคาม'},
    {name: 'มุกดาหาร'},
    {name: 'แม่ฮ่องสอน'},
    {name: 'ยะลา'},
    {name: 'ยโสธร'},
    {name: 'ร้อยเอ็ด'},
    {name: 'ระนอง'},
    {name: 'ระยอง'},
    {name: 'ราชบุรี'},
    {name: 'ลพบุรี'},
    {name: 'ลำปาง'},
    {name: 'ลำพูน'},
    {name: 'เลย'},
    {name: 'ศรีสะเกษ'},
    {name: 'สกลนคร'},
    {name: 'สงขลา'},
    {name: 'สตูล'},
    {name: 'สมุทรปราการ'},
    {name: 'สมุทรสงคราม'},
    {name: 'สมุทรสาคร'},
    {name: 'สระแก้ว'},
    {name: 'สระบุรี'},
    {name: 'สิงห์บุรี'},
    {name: 'สุโขทัย'},
    {name: 'สุพรรณบุรี'},
    {name: 'สุราษฎร์ธานี'},
    {name: 'สุรินทร์'},
    {name: 'หนองคาย'},
    {name: 'หนองบัวลำภู'},
    {name: 'อ่างทอง'},
    {name: 'อุดรธานี'},
    {name: 'อุทัยธานี'},
    {name: 'อุตรดิตถ์'},
    {name: 'อุบลราชธานี'},
    {name: 'อำนาจเจริญ'}
  ];
  private result:  Array<any>;
  form: FormGroup;
  addresses: FormGroup;
  model: any;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  constructor(
    private http: HttpClient,
    private supplierService: SupplierService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.onLoad();
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      district: [null],
      subdistrict: [null],
      province: [null],
      zipcode: [null, Validators.required],
      tel: [null],
      fax: [null],
      email: [null, Validators.email],
      contact: [null],
      note: [null]
    });
  }

  onLoad(){
    this.supplierService.all()
      .subscribe(data=> {
        console.log('form', this.form.value);
        console.log(data);
        this.result = data;
      });
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

  onInsert(){      
    console.log(this.form.value);      
      this.supplierService.create(this.form.value)
        .subscribe(data => {
          this.modalRef.hide();
          this.onLoad();
          this.form = this.formBuilder.group({
            name: [null],
            address: [null],
            district: [null],
            subdistrict: [null],
            province: [null],
            zipcode: [null],
            tel: [null],
            fax: [null],
            email: [null],
            contact: [null],
            note: [null]
        });
        }, err => {
          console.log(err);
        });
  }

  del(_id: string) {
    this.supplierService.delete(_id)
      .subscribe(data=> {
        this.onLoad();
      }, err => {
        console.log(err);
      });
  }

  onEdit(){
    console.log(this.model);
    this.supplierService.update(this.model)
      .subscribe(data => {
        this.modalRef.hide();
        this.onLoad();
      });
  }

}
