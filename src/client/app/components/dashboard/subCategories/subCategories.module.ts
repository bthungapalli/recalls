import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTableModule} from "angular2-datatable";
import { FormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';

import { SubCategoriesComponent }  from './subCategories.component';
import { CategoriesService }  from './../categories/categories.service';
import { SubCategoriesService }  from './subCategories.service';



@NgModule({
  imports: [
  CommonModule,
    DataTableModule,
    FormsModule,
      HttpModule

  ],
  declarations: [
    SubCategoriesComponent,
  ],
  providers:[
    CategoriesService,SubCategoriesService
  ]
})
export class SubCategoriesModule { }
