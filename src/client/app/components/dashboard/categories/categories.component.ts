import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
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

      constructor(private categoriesService:CategoriesService) {
            this.categoryModel=new Category();
      }

      ngOnInit(): void {
      this.categoriesService.getAllCategories().subscribe(response => {
           this.categories=response;
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
                this.categories.push(response);
                this.categoryModel=new Category()
           },err => {
               this.errorMessage="Something went wrong.Please contact administrator";
           });
       }

      };

      deleteCategory(category:Category,index:number){
          this.categoriesService.deleteCategory(category).subscribe(response => {
               this.categories.splice(index,1);
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
      };

 }
