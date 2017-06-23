import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {Profile} from './profile.model';
import {ProfileService} from './profile.service';
import {DashboardService} from '../dashboard.service';


@Component({
  selector: 'profile',
  templateUrl:"./app/components/dashboard/profile/profile.html"
})
export class ProfileComponent {

      public disableFields:boolean=true;
      public errorMessage:String="";
      public successMessage:String="";
      public profileModel: Profile;

      constructor(private profileService:ProfileService,private dashboardService:DashboardService) {
          this.profileModel = new Profile();
          this.profileModel= (<any>Object).assign({}, dashboardService.userDetails)
      }

      submitProfile(){
        this.disableFields=true;
        this.errorMessage="";
        this.successMessage="";
            this.profileService.submitProfile(this.profileModel).subscribe(response => {
                this.successMessage="Profile updated";
                this.dashboardService.userDetails=this.profileModel;
            },err => {
                this.errorMessage="Something went wrong.Please contact administrator";
            });
       }

 }
