import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { SharedModule } from '../../../shared/shared.module';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        EquipmentRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ],
    declarations: [EquipmentComponent]
})
export class EquipmentModule {}