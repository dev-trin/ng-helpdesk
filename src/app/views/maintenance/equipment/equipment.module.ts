import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { SharedModule } from '../../../shared/shared.module';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule, MatSelectModule, MatMenuModule, MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        EquipmentRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        MatInputModule,
        MatButtonModule,
        MatDialogModule,MatSelectModule,MatMenuModule,MatIconModule
    ],
    declarations: [EquipmentComponent]
})
export class EquipmentModule {}