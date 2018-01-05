import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import { FileSelectDirective } from 'ng2-file-upload';


import { RecallsComponent }  from './recalls.component';
import { RecallComponent }  from './recall.component';
import { RecallsService }  from './recalls.service';
import { DataFilterPipe }   from './data.filter';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
  CommonModule,
    DataTableModule,
    FormsModule,
      HttpModule,
      MyDatePickerModule,
      SharedModule
  ],
  declarations: [
    RecallsComponent,
    RecallComponent,
    DataFilterPipe,
  FileSelectDirective
  ],
  providers:[
    RecallsService
  ]
})
export class RecallsModule { }
