import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsComponent } from './problems.component';

const routes: Routes = [
    {
        path: '',
        component: ProblemsComponent,
        data: {
            title: 'ฟอร์มแจ้งปัญหา',
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
export class ProblemsRoutingModule {}