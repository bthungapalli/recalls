import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ProfileComponent }  from './profile.component';
import { ProfileService }  from './profile.service';


@NgModule({
  imports: [
  CommonModule,
    FormsModule,
      HttpModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers:[
    ProfileService
  ]
})
export class ProfileModule { }
