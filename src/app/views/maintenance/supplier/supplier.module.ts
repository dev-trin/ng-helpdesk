import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { SharedModule } from '../../../shared/shared.module';
import { SupplierRoutingModule } from './supplier-routing.module';
import {ModalModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule, MatSelectModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports: [
        CommonModule,
        SupplierRoutingModule,
        SharedModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,MatInputModule,
        MatButtonModule,
        MatDialogModule,MatSelectModule
    ],
    declarations: [SupplierComponent]
})
export class SupplierModule {}