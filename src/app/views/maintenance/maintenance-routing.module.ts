import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemModule } from './system/system.module';
import { GroupsModule } from './groups/groups.module';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'ตั้งค่าระบบ Maintennacesfsfsfsdfsfd',
            status: true
        },
        children: [
            {
                path: 'system',
                loadChildren: './system/system.module#SystemModule'
            },
            {
                path: 'groups',
                loadChildren: './groups/groups.module#GroupsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule {}