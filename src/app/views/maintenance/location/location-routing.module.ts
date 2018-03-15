import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [
    {
        path: '',
        component: LocationComponent,
        data: {
            title: 'สถานที่ตั้งอุปกรณ์',
            icon: 'icon-layers',
            caption: 'ตั้งค่าข้อมูลพื้นฐาน สถานที่ตั้งอุปกรณ์',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationRoutingModule {}