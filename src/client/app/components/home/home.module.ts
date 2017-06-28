import { NgModule,Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouteComponent } from "../app/route.component";
import { SpinnerComponentModule } from 'ng2-component-spinner';
import { HomeComponent }  from './home.component';
import { SpinnerService }  from './spinner.service';



@NgModule({
  imports: [
    FormsModule,
    RouteComponent,
    SpinnerComponentModule
  ],
  declarations: [
    HomeComponent
  ],
  providers:[
SpinnerService
  ]

})
export class HomeModule { }
