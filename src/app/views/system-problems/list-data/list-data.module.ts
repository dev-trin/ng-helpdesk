import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDataComponent } from './list-data.component';
import { SharedModule } from '../../../shared/shared.module';
import { ListDataRoutingModule } from './list-data-routing.module';
import {ModalModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ListDataRoutingModule,
        SharedModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [ListDataComponent]
})
export class ListDataModule {}