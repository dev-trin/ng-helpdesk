import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemProblemsRoutingModule } from './system-problems-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SystemProblemsRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class SystemProblemsModule { }
