import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {Profile} from '../profile/profile.model';
import {UserManagementService} from './userManagement.service';



@Component({
  selector: 'userManagement',
  templateUrl:"./app/components/dashboard/userManagement/UserManagement.html"
})
export class UserManagementComponent implements OnInit{

      public users:Profile[]=[];
      public errorMessage:String="";
      public successMessage:String="";
       public sortBy = "lastName";


      constructor(private userManagementService:UserManagementService) {

      }

      ngOnInit(): void {
      this.userManagementService.getAllUsers().subscribe(response => {
           this.users=response;
      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
      });
      };

     toInt(num: string) {
              return +num;
          }

      activateOrInactivateUser(user:Profile,value:boolean){
      var tempUser = new Profile();
      tempUser= (<any>Object).assign({}, user);
      tempUser.isActive=value;
      this.userManagementService.activeOrInActivateUser(tempUser).subscribe(response => {
           user.isActive=response.isActive;
      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
      });
      };


 }
