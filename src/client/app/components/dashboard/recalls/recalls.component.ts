import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.model';
import {DashboardService} from '../dashboard.service';
import {Profile} from '../profile/profile.model';



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
      public profile:Profile;


      constructor(private recallsService:RecallsService,private categoriesService:CategoriesService,private router:Router,private dashboardService:DashboardService) {
            this.profile=dashboardService.userDetails;
      }

      ngOnInit(): void {

      this.recallsService.getAllRecalls().subscribe(response => {

      if(response.sessionExpired){
        this.router.navigate(['home']);
      }else{
        this.recalls=response;
        if(response.length===0){
        this.successMessage="No Recalls available";
      }
      }

      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
      });

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


      getRecallsForFilter(){
        this.errorMessage="";
        this.successMessage="";
        if(this.fromDate.epoc<this.toDate.epoc){
        this.recallsService.getRecallsForFilter(this.category,this.toDate.formatted,this.fromDate.formatted).subscribe(response => {

             if(response.sessionExpired){
               this.router.navigate(['home']);
             }else{
               this.recalls=response;
               if(response.length===0){
               this.successMessage="No Recalls available for given dates."
               }
             }

        },err => {
            this.errorMessage="Something went wrong.Please contact administrator";
        });
        }else{
        this.errorMessage="To Date should be after From Date";
        }
      }

      deleteRecall(id:String){
        this.errorMessage="";
        this.successMessage="";

        this.recallsService.deleteRecall(id).subscribe(response => {

             if(response.sessionExpired){
               this.router.navigate(['home']);
             }else{
                    var temp=JSON.parse(JSON.stringify(this.recalls));
                    temp.forEach(function(t:any,j:any){
                    if(t._id==id){
                      temp.splice(j,1);
                    }
                    })
                    this.recalls=[];
                  this.recalls=temp;
               }
             }
             ,err => {
            this.errorMessage="Something went wrong.Please contact administrator";
        });
      }

      editRecall(id:String){
        this.errorMessage="";
        this.successMessage="";
        this.router.navigate(['dashboard/recall',id]);

      }

 }
