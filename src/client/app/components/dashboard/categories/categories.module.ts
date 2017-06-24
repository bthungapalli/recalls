import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";

import {HttpModule} from '@angular/http';
import { CategoriesComponent }  from './categories.component';
import { CategoriesService }  from './categories.service';


@NgModule({
  imports: [
  CommonModule,
    DataTableModule,
      HttpModule

  ],
  declarations: [
    CategoriesComponent
  ],
  providers:[
    CategoriesService
  ]
})
export class CategoriesModule { }
