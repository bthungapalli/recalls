import { Component } from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'login',
  templateUrl:"./app/components/home/home.html"
})
export class HomeComponent{

public spinner:boolean;

constructor( private spinnerService: SpinnerService) {
     spinnerService.changeEmitted$.subscribe(
       text => {
           this.spinner=text;
       });
     }
 }
