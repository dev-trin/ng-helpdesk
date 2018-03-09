import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { SharedModule } from '../../../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import {ModalModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        SystemRoutingModule,
        SharedModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule
    ],
    declarations: [SystemComponent]
})
export class SystemModule {}