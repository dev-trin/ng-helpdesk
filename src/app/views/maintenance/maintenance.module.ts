import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

import { MaintenanceRoutingModule } from './maintenance-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MaintenanceRoutingModule,
        SharedModule
    ],
    declarations: []
})
export class MaintenanceModule {}