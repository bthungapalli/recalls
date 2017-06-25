import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';


import { RecallsComponent }  from './recalls.component';
import { RecallComponent }  from './recall.component';
import { RecallsService }  from './recalls.service';
import { DataFilterPipe }   from './data.filter';


@NgModule({
  imports: [
  CommonModule,
    DataTableModule,
    FormsModule,
      HttpModule

  ],
  declarations: [
    RecallsComponent,
    RecallComponent,
    DataFilterPipe
  ],
  providers:[
    RecallsService
  ]
})
export class RecallsModule { }
