import { NgModule,Component } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouteComponent } from "./route.component";
import { AppComponent }  from './app.component';
import { HomeModule }  from '../home/home.module';
import { LoginModule }  from '../home/login/login.module';
import { RegistrationModule }  from '../home/registration/registration.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouteComponent,
    HomeModule,
    LoginModule,
    RegistrationModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
