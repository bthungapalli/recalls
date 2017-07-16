import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';

import { CategoriesComponent }  from './categories.component';
import { CategoriesService }  from './categories.service';
import {RequestCategoryComponent} from './requestCategory.component';


@NgModule({
  imports: [
  CommonModule,
    DataTableModule,
    FormsModule,
      HttpModule

  ],
  declarations: [
    CategoriesComponent,RequestCategoryComponent
  ],
  providers:[
    CategoriesService
  ]
})
export class CategoriesModule { }
