import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {DashboardService} from './dashboard.service';
import {Profile} from './profile/profile.model';
import {SpinnerService} from './spinner.service';
@Component({
  selector: 'dashboard',
  templateUrl:"./app/components/dashboard/dashboard.html"
})
export class DashboardComponent{

      public errorMessage:String="";
      public profile:Profile;
      public expand:boolean=true;
      public spinner:boolean;

      constructor(private dashboardService:DashboardService,private router:Router,private spinnerService: SpinnerService) {
      this.profile=  dashboardService.userDetails;
      spinnerService.changeEmitted$.subscribe(
        text => {
            this.spinner=text;
        });
        dashboardService.changeEmitted$.subscribe(
        response => {
            this.profile=response;
        });   
          
          if(this.profile.role==="Admin"){
               this.router.navigate(['dashboard/profile']);
          }
      }

      logout(){

        this.dashboardService.logout().subscribe(response => {
          this.router.navigate(['home']);
        },err => {
            this.errorMessage="Something went wrong.Please contact administrator";
        });

      }

      toggle(){
      this.expand=!this.expand;
      }

 }
