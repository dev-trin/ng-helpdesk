import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDataComponent } from './list-data.component';

const routes: Routes = [
    {
        path: '',
        component: ListDataComponent,
        data: {
            title: 'รายการแจ้งปัญหา',
            icon: 'icon-layers',
            caption: 'รายงานแจ้งปัญหาเกี่ยวกับระบบที่เกิดขึ้น ส่งผลกระทบในการทำงาน เพื่อบันทึกข้อมูลและแสดงรายการทั้งหมด',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListDataRoutingModule {}