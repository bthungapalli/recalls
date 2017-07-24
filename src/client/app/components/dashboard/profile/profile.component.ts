import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Profile} from './profile.model';
import {ProfileService} from './profile.service';
import {DashboardService} from '../dashboard.service';
import {SpinnerService} from '../spinner.service';
import {CategoriesService} from '../../dashboard/categories/categories.service';
import {Category} from '../../dashboard/categories/categories.model';

@Component({
  selector: 'profile',
  templateUrl:"./app/components/dashboard/profile/profile.html"
})
export class ProfileComponent {

      public disableFields:boolean=true;
      public errorMessage:String="";
      public successMessage:String="";
      public profileModel: Profile;
      public isEmailAlert:boolean;
      public isMobileAlert:boolean;
      public categories:Category[]=[];
    
      constructor(private profileService:ProfileService,private dashboardService:DashboardService,private router:Router,private spinnerService:SpinnerService,private categoriesService:CategoriesService) {
          this.profileModel = new Profile();
          
          this.spinnerService.emitChange(true);
          
            this.categoriesService.getAllCategories().subscribe(response => {
                   this.categories=response;
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
          
           this.profileService.getUser().subscribe(response => {

            if(response.sessionExpired){
            this.spinnerService.emitChange(false);
              this.router.navigate(['home']);
            }else{
                this.profileModel= (<any>Object).assign({}, response);
               this.isEmailAlert=  (<any>this.profileModel.alertsOn).includes("Email");
                this.isMobileAlert=  (<any>this.profileModel.alertsOn).includes("Mobile");
                this.dashboardService.emitChange(response);
              this.dashboardService.userDetails=response;
              this.spinnerService.emitChange(false);
            }

            },err => {
                this.errorMessage="Something went wrong.Please contact administrator";
                this.spinnerService.emitChange(false);
            });
          
          
      }

              
              
              
      submitProfile(){
      this.spinnerService.emitChange(true);
        this.disableFields=true;
        this.errorMessage="";
        this.successMessage="";
           if(this.isEmailAlert && this.isMobileAlert){
                this.profileModel.alertsOn=["Email","Mobile"];
            }else if(this.isEmailAlert){
                this.profileModel.alertsOn=["Email"];
            }else if(this.isMobileAlert){
                this.profileModel.alertsOn=["Mobile"];
            }
            this.profileService.submitProfile(this.profileModel).subscribe(response => {

            if(response.sessionExpired){
            this.spinnerService.emitChange(false);
              this.router.navigate(['home']);
            }else{
              this.successMessage="Profile updated";
              this.dashboardService.userDetails=this.profileModel;
              this.spinnerService.emitChange(false);
            }

            },err => {
                this.errorMessage="Something went wrong.Please contact administrator";
                this.spinnerService.emitChange(false);
            });
       }

 }
