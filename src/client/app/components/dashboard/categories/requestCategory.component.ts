import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Category} from './categories.model';
import {CategoriesService} from './categories.service';
import {SpinnerService} from '../spinner.service';


@Component({
  selector: 'requestCategory',
  templateUrl:"./app/components/dashboard/categories/requestCategory.html"
})
export class RequestCategoryComponent{

     
      public errorMessage:String="";
      public successMessage:String="";
      public categoryName:String="";

      constructor(private categoriesService:CategoriesService,private router:Router,private spinnerService:SpinnerService) {
          
      }

      submitRequest(){
      this.spinnerService.emitChange(true);
          this.errorMessage="";

               this.categoriesService.requestCategory(this.categoryName).subscribe(response => {
                 if(response.sessionExpired){
                 this.spinnerService.emitChange(false);
                   this.router.navigate(['home']);
                 }else{
                       this.categoryName="";
                   this.successMessage="Request Sent"
                 }
                   this.spinnerService.emitChange(false);
               },err => {
                   this.errorMessage="Something went wrong.Please contact administrator";
                   this.spinnerService.emitChange(false);
               });
      };

 }
