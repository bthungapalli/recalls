import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponentModule } from 'ng2-component-spinner';
import { FormsModule }   from '@angular/forms';
import { RouteComponent } from "../app/route.component";
import { DashboardComponent }  from './dashboard.component';
import { DashboardService }  from './dashboard.service';
import { SpinnerService }  from './spinner.service';

@NgModule({
  imports: [
    FormsModule,
    RouteComponent,
    CommonModule,
    SpinnerComponentModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers:[
  DashboardService,
  SpinnerService
  ]

})
export class DashboardModule { }
