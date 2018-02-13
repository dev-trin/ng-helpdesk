import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormValidationComponent } from './form-validation.component';

const routes: Routes = [
    {
        path: '',
        component: FormValidationComponent,
        data: {
            title: 'ฟอร์มข้อมูล',
            icon: 'icon-layers',
            caption: 'กรอกข้อมูลในฟอร์ม - ตรวจสอบความถูกต้อง',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormValidationRoutingModule {}