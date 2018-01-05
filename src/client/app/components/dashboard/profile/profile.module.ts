import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ProfileComponent }  from './profile.component';
import { ProfileService }  from './profile.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
      HttpModule,
      DataTableModule,
      SharedModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers:[
    ProfileService
  ]
})
export class ProfileModule { }
