import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UiModule } from './ui/ui.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FileControlComponent } from './services/common/file-control/file-control.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    UiModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("token"),
        allowedDomains:["localhost:7000"]
      }
    })
  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7000/api"},
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
