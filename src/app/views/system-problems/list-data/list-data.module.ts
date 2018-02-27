import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDataComponent } from './list-data.component';
import { SharedModule } from '../../../shared/shared.module';
import { ListDataRoutingModule } from './list-data-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ListDataRoutingModule,
        SharedModule,
    ],
    declarations: [ListDataComponent]
})
export class ListDataModule {}