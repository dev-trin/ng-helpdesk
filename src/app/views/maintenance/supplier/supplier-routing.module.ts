import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier.component';

const routes: Routes = [
    {
        path: '',
        component: SupplierComponent,
        data: {
            title: 'บริษัทผู้ให้บริการ',
            icon: 'icon-layers',
            caption: 'ตั้งค่าข้อมูลบริษัทผู้ให้บริการ',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupplierRoutingModule {}