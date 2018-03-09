import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';

const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
       /* data: {
            title: 'รายการที่แจ้งระบบ',
            icon: 'icon-layers',
            caption: 'ชื่อรายการที่แจ้งปัญหาระบบ เช่น แจ้งปัญหา server, แจ้งปัญหาโทรศัพท์ เป็นต้น',
            status:  true
        }*/
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {}