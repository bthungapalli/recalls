import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { RegistrationComponent }  from './registration.component';
import { RegistrationService }  from './registration.service';
import { CategoriesService }  from '../../dashboard/categories/categories.service';

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
    RegistrationService,CategoriesService
  ]
})
export class RegistrationModule { }
