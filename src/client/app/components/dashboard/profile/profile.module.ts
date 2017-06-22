import { NgModule,Component } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ProfileComponent }  from './profile.component';
import { ProfileService }  from './profile.service';


@NgModule({
  imports: [
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
