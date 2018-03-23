import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemModule } from './system/system.module';
import { GroupsModule } from '../maintenance/groups/groups.module';
import { LocationModule } from './location/location.module';
import { EquipmentModule } from './equipment/equipment.module';
import { SupplierModule } from './supplier/supplier.module';

const routes: Routes = [
    {
        path: '',
        data: {
           // title: 'ตั้งค่าข้อมูลพื้นฐาน',
            status: false
        },
        children: [
            {
                path: 'system',
                loadChildren: './system/system.module#SystemModule'
            },
            {
                path: 'groups',
                loadChildren: './groups/groups.module#GroupsModule'
            }, 
            {
                path: 'location',
                loadChildren: './location/location.module#LocationModule'
            },
            {
                path: 'equipment',
                loadChildren: './equipment/equipment.module#EquipmentModule'
            },
            {
                path: 'supplier',
                loadChildren: './supplier/supplier.module#SupplierModule' 
            }
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule {}