import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {DashboardService} from './dashboard.service';
import {Profile} from './profile/profile.model';

@Component({
  selector: 'dashboard',
  templateUrl:"./app/components/dashboard/dashboard.html"
})
export class DashboardComponent{

      public errorMessage:String="";
      public profile:Profile;
      public expand:boolean=true;

      constructor(private dashboardService:DashboardService,private router:Router) {
      this.profile=  dashboardService.userDetails;
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
