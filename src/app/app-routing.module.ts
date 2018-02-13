import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import { LoginComponent } from './site/login/login.component';
import { ForgotComponent } from './site/forgot/forgot.component';
import { LayoutComponent } from './main/layout/layout.component';
import { AuthGuard } from './site/guards/index';
const routes: Routes = [
    {
      path: '',
      component: LoginComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'forgot',
      component: ForgotComponent,
    },
    {
      path: 'main',
      component: LayoutComponent,
      children: [
        {
          path: 'request',
          loadChildren: './views/request/request.module#RequestModule',
          
        },
        {
          path: 'widget',
          loadChildren: './theme/widget/widget.module#WidgetModule'
        },
        {
          path: 'dashboard',
          loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
        },
        {
          path: 'animations',
          loadChildren: './theme/ui-elements/animation/animation.module#AnimationModule'
        },
      ]
    },
    {
    path: '',
    component: AdminComponent,
    children: [
      /*{
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },*/
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'navigation',
        loadChildren: './theme/navigation/navigation.module#NavigationModule'
      },
      {
        path: 'widget',
        loadChildren: './theme/widget/widget.module#WidgetModule'
      },
      {
        path: 'basic',
        loadChildren: './theme/ui-elements/basic/basic.module#BasicModule'
      },
      {
        path: 'advance',
        loadChildren: './theme/ui-elements/advance/advance.module#AdvanceModule'
      },
      {
        path: 'animations',
        loadChildren: './theme/ui-elements/animation/animation.module#AnimationModule'
      },
      {
        path: 'forms',
        loadChildren: './theme/forms/forms.module#FormsModule'
      },
      {
        path: 'bootstrap-table',
        loadChildren: './theme/table/bootstrap-table/bootstrap-table.module#BootstrapTableModule'
      },
      {
        path: 'data-table',
        loadChildren: './theme/table/data-table/data-table.module#DataTableModule'
      },
      {
        path: 'maintenance/error',
        loadChildren: './theme/maintenance/error/error.module#ErrorModule'
      },
      {
        path: 'maintenance/coming-soon',
        loadChildren: './theme/maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      },
      {
        path: 'user',
        loadChildren: './theme/user/user.module#UserModule'
      },
      {
        path: 'task',
        loadChildren: './theme/task/task.module#TaskModule'
      },
      {
        path: 'invoice',
        loadChildren: './theme/extension/invoice/invoice.module#InvoiceModule'
      },
      {
        path: 'file-upload-ui',
        loadChildren: './theme/extension/file-upload-ui/file-upload-ui.module#FileUploadUiModule'
      },
      {
        path: 'charts',
        loadChildren: './theme/chart/chart.module#ChartModule'
      },
      {
        path: 'map',
        loadChildren: './theme/map/map.module#MapModule'
      },
      {
        path: 'simple-page',
        loadChildren: './theme/simple-page/simple-page.module#SimplePageModule'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
