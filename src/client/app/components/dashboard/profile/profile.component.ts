import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

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

      constructor(private profileService:ProfileService,private dashboardService:DashboardService,private router:Router) {
          this.profileModel = new Profile();
          this.profileModel= (<any>Object).assign({}, dashboardService.userDetails);
      }

      submitProfile(){
        this.disableFields=true;
        this.errorMessage="";
        this.successMessage="";
            this.profileService.submitProfile(this.profileModel).subscribe(response => {

            if(response=="sessionExpired"){
              this.router.navigate(['home']);
            }else{
              this.successMessage="Profile updated";
              this.dashboardService.userDetails=this.profileModel;
            }

            },err => {
                this.errorMessage="Something went wrong.Please contact administrator";
            });
       }

 }
