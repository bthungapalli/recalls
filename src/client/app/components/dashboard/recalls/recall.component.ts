import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.model';



@Component({
  selector: 'recall',
  templateUrl:"./app/components/dashboard/recalls/recall.html"
})
export class RecallComponent implements OnInit{

      public errorMessage:String="";
      public successMessage:String="";
      public recallModel:Recall;
      public categories:Category[]=[];

      constructor(private recallsService:RecallsService,private categoriesService:CategoriesService,private router:Router) {
         this.recallModel=new Recall();
         this.recallModel.categoryName="Select Category";
      }

      ngOnInit(): void {
          this.categoriesService.getAllCategories().subscribe(response => {
              this.categories=response;
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
      };

      submitRecall(){
          this.recallsService.submitRecall(this.recallModel).subscribe(response => {
               this.router.navigate(['dashboard/recalls']);
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
      }

 }
