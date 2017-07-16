import { Component,Input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {Registration} from './registration.model';
import {RegistrationService} from './registration.service';
import {DashboardService} from '../../dashboard/dashboard.service';
import {SpinnerService} from '../spinner.service';


@Component({
  selector: 'registration',
  templateUrl:"./app/components/home/registration/registration.html"
})
export class RegistrationComponent {

      public errorMessage:String="";
      public registrationModel: Registration;
      public spinner:boolean;
      public isEmailAlert:boolean;
      public isMobileAlert:boolean;

      constructor(private registrationService:RegistrationService,private router:Router,private dashboardService:DashboardService,private spinnerService:SpinnerService) {
          this.registrationModel = new Registration();
      }

      submitSignUp(){
      this.spinnerService.emitChange(true);
        this.errorMessage="";
        if(this.registrationModel.password===this.registrationModel.confirmPassword){
            
            if(this.isEmailAlert && this.isMobileAlert){
                this.registrationModel.alertsOn=["Email","Mobile"];
            }else if(this.isEmailAlert){
                this.registrationModel.alertsOn=["Email"];
            }else if(this.isMobileAlert){
                this.registrationModel.alertsOn=["Mobile"];
            }
            this.registrationService.submitSignUp(this.registrationModel).subscribe(response => {
            this.dashboardService.setUserToProfile(response);
            this.router.navigate(['dashboard/profile']);
                this.spinnerService.emitChange(false);
            },err => {
                                    this.errorMessage="Something went wrong.Please contact administrator";
                                    this.spinnerService.emitChange(false);
            });
        }else{
            this.errorMessage="Password and ConfirmPassword dint match";
            this.spinnerService.emitChange(false);
        }

      }

      checkEmail(){
      this.errorMessage="";
      this.registrationService.checkEmail(this.registrationModel).subscribe(response => {

              if(response.alreadyExist){
              this.errorMessage="Email already exist";
              }
          },err => {
                                  console.log(err);
          });
      }

 }
