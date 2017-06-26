import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { RouteComponent } from "../app/route.component";
import { DashboardComponent }  from './dashboard.component';
import { DashboardService }  from './dashboard.service';

@NgModule({
  imports: [
    FormsModule,
    RouteComponent,
    CommonModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers:[
  DashboardService
  ]

})
export class DashboardModule { }
