import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './site/breadcrumbs/breadcrumbs.component';

import { LoginComponent } from './site/login/login.component';
import { ForgotComponent } from './site/forgot/forgot.component';
import { LayoutComponent } from './main/layout/layout.component';

import { AuthGuard } from './site/guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './site/helpers/index';
import { AuthenticationService,UserService,ForgotService,SystemService,PagerService, GroupsService,LocationService,EquipmentService} from './services/index';
import { dateFormatPipe } from './pipe/date-format-pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    LoginComponent,
    ForgotComponent,
    LayoutComponent,
    dateFormatPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MenuItems,
    AuthGuard,
    JwtInterceptorProvider,
    AuthenticationService, 
    ErrorInterceptorProvider, 
    UserService, 
    ForgotService, 
    SystemService,
    PagerService,
    GroupsService,
    LocationService,EquipmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
