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

      constructor(private categoriesService:CategoriesService) {

      }

      ngOnInit(): void {
      this.categoriesService.getAllCategories().subscribe(response => {
           this.categories=response;
      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
      });
      };

 }
