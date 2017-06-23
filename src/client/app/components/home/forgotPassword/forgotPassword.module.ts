import { NgModule,Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';

import { ForgotPasswordComponent }  from './forgotPassword.component';
import {ForgotPasswordService} from './forgotPassword.service';

@NgModule({
  imports: [
    FormsModule,
    HttpModule
  ],
  declarations: [
    ForgotPasswordComponent
  ],
  providers:[
    ForgotPasswordService
  ]
})
export class ForgotPasswordModule { }
