import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Category} from './../categories/categories.model';
import {CategoriesService} from './../categories/categories.service';
import {SubCategoriesService} from './subCategories.service';
import {SpinnerService} from '../spinner.service';


@Component({
  selector: 'subcategories',
  templateUrl:"./app/components/dashboard/subCategories/subCategories.html"
})
export class SubCategoriesComponent implements OnInit{

      public categories:Category[]=[];
      public errorMessage:String="";
      public successMessage:String="";
      public categoryModel:Category;
      public mainCategory:any;
      public subCategory:any=[];
      public selectedCategory:any="Select Category";
      public subCategoryFormData:any=[];

      constructor(private categoriesService:CategoriesService,private router:Router,
        private spinnerService:SpinnerService,private subCategoriesService:SubCategoriesService) {
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

      validateSubCategory(){
        let valid=true;
        this.selectedCategory.rows.forEach((row,index) => {
          let temp=0;
          this.selectedCategory.subCategories.forEach((category,index) => {
            if(row[category].toUpperCase()===this.subCategoryFormData[index].toUpperCase()){
              temp++;
              }
          });
          if(temp===this.selectedCategory.subCategories.length){
            valid= false
          }
        });
        return valid;
      };

      submitSubCategory(){
        this.errorMessage="";
        if(this.validateSubCategory()){
          var temp={};
          this.selectedCategory.subCategories.forEach((category,index) => {
              temp[category]=this.subCategoryFormData[index]
          });
          let tempSubCategory= JSON.parse(JSON.stringify(this.selectedCategory));
          tempSubCategory.rows.push(temp);
         
          this.subCategoriesService.createSubCategory(tempSubCategory).subscribe(response => {
            
                             if(response.sessionExpired){
                             this.spinnerService.emitChange(false);
                               this.router.navigate(['home']);
                             }else{
                              this.selectedCategory.rows.push(temp);
                              this.subCategoryFormData=[];
                             }
                               this.spinnerService.emitChange(false);
                           },err => {
                               this.errorMessage="Something went wrong.Please contact administrator";
                               this.spinnerService.emitChange(false);
                           });
        }else{
          this.errorMessage="Duplicate Subcategory values";
        }

        
      };

      deleteSubCategory(index){
        let tempSubCategory= JSON.parse(JSON.stringify( this.selectedCategory));
        tempSubCategory.rows.splice(index,1);
        this.subCategoriesService.deleteSubCategory(tempSubCategory).subscribe(response => {
          
                           if(response.sessionExpired){
                           this.spinnerService.emitChange(false);
                             this.router.navigate(['home']);
                           }else{
                            this.selectedCategory.rows.splice(index,1);
                           }
                             this.spinnerService.emitChange(false);
                         },err => {
                             this.errorMessage="Something went wrong.Please contact administrator";
                             this.spinnerService.emitChange(false);
                         });
      }
      

 }
