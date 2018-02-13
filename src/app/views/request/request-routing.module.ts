import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'แจ้งรับบริการ',
      status: false
    },
    children: [
      {
        path: 'validation',
        loadChildren: './form-validation/form-validation.module#FormValidationModule'
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
