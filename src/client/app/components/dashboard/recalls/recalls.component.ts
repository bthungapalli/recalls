import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.model';
import {DashboardService} from '../dashboard.service';
import {Profile} from '../profile/profile.model';
import {SpinnerService} from '../spinner.service';
import {ProfileService} from '../profile/profile.service';
import { TitleCasePipe } from '../../shared/data.filter';

@Component({
  selector: 'recalls',
  templateUrl:"./app/components/dashboard/recalls/recalls.html"
})
export class RecallsComponent implements OnInit{

      public errorMessage:String="";
      public successMessage:String="";
      public recalls:Recall[]=[];
      public categories:String[]=[];
      public sortBy:String = "created_at";
      public sortOrder:String = "desc";

      public category:String="All";
      public toDate:any;
      public fromDate:any;
      public profile:Profile;

      public subCategoriesArray:any=[];
      public subCategoriesData:any=[];
      public selectedCategory:any="Select Category";
      public selectedSubcategories:any=[];


      constructor(private recallsService:RecallsService,private categoriesService:CategoriesService,private router:Router,private dashboardService:DashboardService,private spinnerService:SpinnerService,private profileService:ProfileService) {
          
          if(dashboardService.userDetails.categories!==undefined){
               this.profile=dashboardService.userDetails;
               //this.categories=dashboardService.userDetails.categories;
               if(this.profile.role=='User'){
                this.spinnerService.emitChange(true);
                this.categoriesService.getAllCategories().subscribe(response => {
                    if(response.sessionExpired){
                    this.spinnerService.emitChange(false);
                      this.router.navigate(['home']);
                    }else{
                        var temp=this;
                        // response.forEach(function(category){
                        //     temp.categories.push(category.categoryName);
                        // });
                        temp.categories=response;
                    }
                    this.spinnerService.emitChange(false);
                },err => {
                    this.errorMessage="Something went wrong.Please contact administrator";
                    this.spinnerService.emitChange(false);
                });
          }else{
                 this.categories=this.profile.categories;
          }
          }else{
                 this.profileService.getUser().subscribe(response => {
            if(response.sessionExpired){
              this.router.navigate(['home']);
            }else{
                this.profile=response;
              this.categories=response.categories;
              this.dashboardService.userDetails=response;
              if(this.profile.role=='User'){
                this.spinnerService.emitChange(true);
                this.categoriesService.getAllCategories().subscribe(response => {
                    if(response.sessionExpired){
                    this.spinnerService.emitChange(false);
                      this.router.navigate(['home']);
                    }else{
                        var temp=this;
                        // response.forEach(function(category){
                        //     temp.categories.push(category.categoryName);
                        // });
                        temp.categories=response;
                    }
                    this.spinnerService.emitChange(false);
                },err => {
                    this.errorMessage="Something went wrong.Please contact administrator";
                    this.spinnerService.emitChange(false);
                });
          }else{
                 this.categories=this.profile.categories;
          }
            }
            },err => {
                this.errorMessage="Something went wrong.Please contact administrator";
                this.spinnerService.emitChange(false);
            });
          }
      }

      ngOnInit(): void {

          
      };

      

      isSubCategoryValid(){
        let isInvalid=true;
        if(this.selectedCategory!=="Select Category" && this.subCategoriesArray.length===this.selectedCategory.subCategories.length){
            let i=0;
            this.subCategoriesArray.forEach((subCategory,index) => {
                if(subCategory.includes("Select")){
                  i++;
                }
             }); 
             if(i==0){
                isInvalid=false;
             }
        }
        return isInvalid;
      };

      showSubCategories(index){
        if(index===0){
          this.subCategoriesArray=[];
          this.subCategoriesData=[];
          
        }
        
          if(this.selectedCategory !=='Select Category' && index!==this.selectedCategory.subCategories.length){
            this.subCategoriesData[index]=[];
            let key= this.selectedCategory.subCategories[index];
            this.subCategoriesArray[index]="Select "+key;
            this.selectedCategory.rows.forEach(row => {
              if(index>0 && this.subCategoriesArray[index-1]===row[this.selectedCategory.subCategories[index-1]] && this.subCategoriesData[index].indexOf(row[key])==-1){
                this.subCategoriesData[index].push(row[key]);
            }
            if(index===0){
              if(this.subCategoriesData[index].indexOf(row[key])===-1){
                this.subCategoriesData[index].push(row[key]);
            }
            }
            });
          }
       
    };

      getRecallsForFilter(){

        this.errorMessage="";
        this.successMessage="";
          
          if((this.fromDate!==undefined && this.fromDate!==null) && (this.toDate!==undefined && this.toDate!==null) && this.fromDate.epoc>this.toDate.epoc){
              this.errorMessage="To Date should be after From Date";
          }else{
              this.spinnerService.emitChange(true);
              let category=this.selectedCategory.categoryName;;
              this.subCategoriesArray.forEach((data,index)=>{
                category=category+"~"+data;
              });
              
        this.recallsService.getRecallsForFilter(category,(this.toDate===undefined || this.toDate===null)?undefined:this.toDate.formatted,(this.fromDate===undefined || this.fromDate===null)?undefined:this.fromDate.formatted).subscribe(response => {

             if(response.sessionExpired){
             this.spinnerService.emitChange(false);
               this.router.navigate(['home']);
             }else{
               this.recalls=response;
               if(response.length===0){
               this.successMessage="No Recalls available for given dates."
               }
             }
             this.spinnerService.emitChange(false);
        },err => {
            this.errorMessage="Something went wrong.Please contact administrator";
            this.spinnerService.emitChange(false);
        });
         }
          
          
//        if(this.fromDate this.toDate  this.fromDate.epoc<this.toDate.epoc){
//        this.spinnerService.emitChange(true);
//        this.recallsService.getRecallsForFilter(this.category,this.toDate.formatted,this.fromDate.formatted).subscribe(response => {
//
//             if(response.sessionExpired){
//             this.spinnerService.emitChange(false);
//               this.router.navigate(['home']);
//             }else{
//               this.recalls=response;
//               if(response.length===0){
//               this.successMessage="No Recalls available for given dates."
//               }
//             }
//this.spinnerService.emitChange(false);
//        },err => {
//            this.errorMessage="Something went wrong.Please contact administrator";
//            this.spinnerService.emitChange(false);
//        });
//        }else{
//        this.errorMessage="To Date should be after From Date";
//        }
      }

      deleteRecall(id:String){
        this.errorMessage="";
        this.successMessage="";
this.spinnerService.emitChange(true);
        this.recallsService.deleteRecall(id).subscribe(response => {

             if(response.sessionExpired){
             this.spinnerService.emitChange(false);
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
               this.spinnerService.emitChange(false);
             }
             ,err => {
            this.errorMessage="Something went wrong.Please contact administrator";
            this.spinnerService.emitChange(false);
        });
      }

      editRecall(id:String){
        this.errorMessage="";
        this.successMessage="";
        this.router.navigate(['dashboard/recall',id]);

      }

 }
