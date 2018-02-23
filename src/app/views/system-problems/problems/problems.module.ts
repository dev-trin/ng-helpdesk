import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsComponent } from './problems.component';
import {ProblemsRoutingModule} from './problems-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProblemsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProblemsComponent]
})
export class ProblemsModule { }