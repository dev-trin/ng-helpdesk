import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { SharedModule } from '../../../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';
import {ModalModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        GroupsRoutingModule,
        SharedModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [GroupsComponent]
})
export class GroupsModule {}