import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";

import {HttpModule} from '@angular/http';
import { UserManagementComponent }  from './userManagement.component';
import { UserManagementService }  from './userManagement.service';


@NgModule({
  imports: [
  CommonModule,
    DataTableModule,
      HttpModule,

  ],
  declarations: [
    UserManagementComponent
  ],
  providers:[
    UserManagementService
  ]
})
export class UserManagementModule { }
