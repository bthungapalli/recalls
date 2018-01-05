import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DataTableModule} from "angular2-datatable";

import { RegistrationComponent }  from './registration.component';
import { RegistrationService }  from './registration.service';
import { CategoriesService }  from '../../dashboard/categories/categories.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
      HttpModule,
      CommonModule,
      DataTableModule,
      SharedModule
  ],
  declarations: [
    RegistrationComponent
  ],
  providers:[
    RegistrationService,CategoriesService
  ]
})
export class RegistrationModule { }
