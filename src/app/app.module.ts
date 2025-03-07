import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {JwtModule} from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './jwt-un-authorized-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter :()=>{
          return (sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser") as string).token: null);
        }
      }
    }),
    AdminModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass:JwtInterceptorService,multi:true},
    {provide: HTTP_INTERCEPTORS , useClass:JwtUnAuthorizedInterceptorService,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
