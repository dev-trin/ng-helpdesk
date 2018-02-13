import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './site/login/login.component';
import { ForgotComponent } from './site/forgot/forgot.component';
import { LayoutComponent } from './main/layout/layout.component';

import { AlertComponent } from './site/directives/index';
import { AuthGuard } from './site/guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './site/helpers/index';
import { AlertService, AuthenticationService, UserService} from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    LoginComponent,
    ForgotComponent,
    LayoutComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MenuItems,AuthGuard,JwtInterceptorProvider,AlertService ,AuthenticationService, ErrorInterceptorProvider, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
