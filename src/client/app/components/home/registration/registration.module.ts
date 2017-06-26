import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { RegistrationComponent }  from './registration.component';
import { RegistrationService }  from './registration.service';


@NgModule({
  imports: [
    FormsModule,
      HttpModule,
      CommonModule
  ],
  declarations: [
    RegistrationComponent
  ],
  providers:[
    RegistrationService
  ]
})
export class RegistrationModule { }
