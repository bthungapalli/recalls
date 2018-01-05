import { NgModule,Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import {TitleCasePipe} from './data.filter';

@NgModule({
  imports: [
   
    CommonModule
  ],
  declarations: [
    TitleCasePipe
  ],
  providers:[

  ],exports:[TitleCasePipe]

})
export class SharedModule { }
