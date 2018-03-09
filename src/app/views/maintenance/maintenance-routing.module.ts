import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemModule } from './system/system.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'รายการแจ้งระบบ',
            status: true
        },
        children: [
            {
                path: 'system',
                loadChildren: './system/system.module#SystemModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule {}