import { NgModule,Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';

import { LoginComponent }  from './login.component';
import {LoginService} from './login.service';

@NgModule({
  imports: [
    FormsModule,
    HttpModule
  ],
  declarations: [
    LoginComponent
  ],
  providers:[
    LoginService

  ]
})
export class LoginModule { }
