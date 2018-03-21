import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentComponent } from './equipment.component';

const routes: Routes = [
    {
        path: '',
        component: EquipmentComponent,
        data: {
            title: 'ประเภทอุปกรณ์',
            icon: 'icon-layers',
            caption: 'ตั้งค่าข้อมูลประเภทอุปกรณ์',
            status: true
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EquipmentRoutingModule {}