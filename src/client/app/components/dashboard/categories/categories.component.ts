import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Category} from './categories.model';
import {CategoriesService} from './categories.service';



@Component({
  selector: 'categories',
  templateUrl:"./app/components/dashboard/categories/categories.html"
})
export class CategoriesComponent implements OnInit{

      public categories:Category[]=[];
      public errorMessage:String="";
      public successMessage:String="";
      public categoryModel:Category;

      constructor(private categoriesService:CategoriesService,private router:Router) {
            this.categoryModel=new Category();
      }

      ngOnInit(): void {
          this.categoriesService.getAllCategories().subscribe(response => {
                if(response.sessionExpired){
                  this.router.navigate(['home']);
                }else{
                   this.categories=response;
                }
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
      };

      submitCategory(){
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
           }else{
               this.categoriesService.createCategory(this.categoryModel).subscribe(response => {

                 if(response.sessionExpired){
                   this.router.navigate(['home']);
                 }else{
                   this.categories.push(response);
                   this.categoryModel=new Category();
                 }

               },err => {
                   this.errorMessage="Something went wrong.Please contact administrator";
               });
           }
      };

      deleteCategory(category:Category){
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

          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
      };

 }
