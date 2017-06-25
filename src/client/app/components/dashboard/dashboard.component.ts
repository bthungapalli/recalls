import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {DashboardService} from './dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl:"./app/components/dashboard/dashboard.html"
})
export class DashboardComponent{

      public errorMessage:String="";

      constructor(private dashboardService:DashboardService,private router:Router) {

      }

      logout(){

        this.dashboardService.logout().subscribe(response => {
          this.router.navigate(['home']);
        },err => {
            this.errorMessage="Something went wrong.Please contact administrator";
        });

      }

 }
