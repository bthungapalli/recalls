import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.model';



@Component({
  selector: 'recalls',
  templateUrl:"./app/components/dashboard/recalls/recalls.html"
})
export class RecallsComponent implements OnInit{

      public errorMessage:String="";
      public successMessage:String="";
      public recalls:Recall[]=[];
      public categories:Category[]=[];
      public sortBy:String = "created_at";
      public sortOrder:String = "desc";

      public category:String="All";
      public toDate:any;
      public fromDate:any;


      constructor(private recallsService:RecallsService,private categoriesService:CategoriesService) {

      }

      ngOnInit(): void {

      this.recallsService.getAllRecalls().subscribe(response => {
           this.recalls=response;
      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
      });

      this.categoriesService.getAllCategories().subscribe(response => {
          this.categories=response;
      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
      });

      };


      getRecallsForFilter(){
        this.errorMessage="";
        if(this.fromDate.epoc<this.toDate.epoc){
        this.recallsService.getRecallsForFilter(this.category,this.toDate.formatted,this.fromDate.formatted).subscribe(response => {
             this.recalls=response;
        },err => {
            this.errorMessage="Something went wrong.Please contact administrator";
        });
        }else{
        this.errorMessage="To Date should be after From Date";
        }
      }

 }
