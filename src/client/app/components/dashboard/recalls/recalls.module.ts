import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from "angular2-datatable";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import { FileSelectDirective } from 'ng2-file-upload';
import { EditorModule } from '@tinymce/tinymce-angular';

import { RecallsComponent } from './recalls.component';
import { RecallComponent } from './recall.component';
import { RecallsService } from './recalls.service';
import { DataFilterPipe } from './data.filter';
import { SharedModule } from '../../shared/shared.module';
import { ShowRecallComponent } from './showRecall.component';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    SharedModule,
    EditorModule
  ],
  declarations: [
    RecallsComponent,
    RecallComponent,
    DataFilterPipe,
    FileSelectDirective,
    ShowRecallComponent
  ],
  providers: [
    RecallsService
  ]
})
export class RecallsModule { }
