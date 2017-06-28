import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Profile} from '../profile/profile.model';
import {UserManagementService} from './userManagement.service';
import {SpinnerService} from '../spinner.service';


@Component({
  selector: 'userManagement',
  templateUrl:"./app/components/dashboard/userManagement/UserManagement.html"
})
export class UserManagementComponent implements OnInit{

      public users:Profile[]=[];
      public errorMessage:String="";
      public successMessage:String="";
      public sortBy = "lastName";


      constructor(private userManagementService:UserManagementService,private router:Router,private spinnerService:SpinnerService) {

      }

      ngOnInit(): void {
      this.spinnerService.emitChange(true);
      this.userManagementService.getAllUsers().subscribe(response => {

           if(response.sessionExpired){
           this.spinnerService.emitChange(false);
             this.router.navigate(['home']);
           }else{
             this.users=response;
           }
this.spinnerService.emitChange(false);
      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
          this.spinnerService.emitChange(false);
      });
      };

     toInt(num: string) {
              return +num;
          }

      activateOrInactivateUser(user:Profile,value:boolean){
          var tempUser = new Profile();
          tempUser= (<any>Object).assign({}, user);
          tempUser.isActive=value;
          this.spinnerService.emitChange(true);
          this.userManagementService.activeOrInActivateUser(tempUser).subscribe(response => {

               if(response.sessionExpired){
               this.spinnerService.emitChange(false);
                 this.router.navigate(['home']);
               }else{
                 user.isActive=response.isActive;
               }
this.spinnerService.emitChange(false);
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
              this.spinnerService.emitChange(false);
          });
      };


 }
