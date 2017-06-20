import { NgModule,Component } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { RouteComponent } from "../app/route.component";
import { HomeComponent }  from './home.component';


@NgModule({
  imports: [
    FormsModule,
    RouteComponent
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
