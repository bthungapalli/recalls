import { NgModule,Component } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { RouteComponent } from "../app/route.component";
import { DashboardComponent }  from './dashboard.component';


@NgModule({
  imports: [
    FormsModule,
    RouteComponent
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
