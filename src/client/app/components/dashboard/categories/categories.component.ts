import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Category} from './categories.model';
import {CategoriesService} from './categories.service';
import {SpinnerService} from '../spinner.service';


@Component({
  selector: 'categories',
  templateUrl:"./app/components/dashboard/categories/categories.html"
})
export class CategoriesComponent implements OnInit{

      public categories:Category[]=[];
      public errorMessage:String="";
      public successMessage:String="";
      public categoryModel:Category;

      constructor(private categoriesService:CategoriesService,private router:Router,private spinnerService:SpinnerService) {
            this.categoryModel=new Category();
      }

      ngOnInit(): void {
      this.spinnerService.emitChange(true);
          this.categoriesService.getAllCategories().subscribe(response => {
                if(response.sessionExpired){
                  this.spinnerService.emitChange(false);
                  this.router.navigate(['home']);
                }else{
                   this.categories=response;
                }
                this.spinnerService.emitChange(false);
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
              this.spinnerService.emitChange(false);
          });
      };

      submitCategory(){
      this.spinnerService.emitChange(true);
          this.errorMessage="";
           var isCategoryAlreadyExist=false;
            var categoryModel=  this.categoryModel;
           this.categories.forEach(function (category) {
                 if(category.categoryName.toUpperCase()===categoryModel.categoryName.toUpperCase()){
                 isCategoryAlreadyExist=true;
                 }
           });

           if(isCategoryAlreadyExist){
                this.errorMessage="Category already exist";
                this.spinnerService.emitChange(false);
           }else{
               this.categoriesService.createCategory(this.categoryModel).subscribe(response => {

                 if(response.sessionExpired){
                 this.spinnerService.emitChange(false);
                   this.router.navigate(['home']);
                 }else{
                   this.categories.push(response);
                   this.categoryModel=new Category();
                 }
                   this.spinnerService.emitChange(false);
               },err => {
                   this.errorMessage="Something went wrong.Please contact administrator";
                   this.spinnerService.emitChange(false);
               });
           }
      };

      deleteCategory(category:Category){
      this.spinnerService.emitChange(true);
          this.categoriesService.deleteCategory(category).subscribe(response => {

              if(response.sessionExpired){
                this.router.navigate(['home']);
              }else{
                  var temp=JSON.parse(JSON.stringify(this.categories));
                  temp.forEach(function(t:any,j:any){
                  if(t._id==category._id){
                    temp.splice(j,1);
                  }
                  })
                  this.categories=[];
                  this.categories=temp;
              }
this.spinnerService.emitChange(false);
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
              this.spinnerService.emitChange(false);
          });
      };

 }
