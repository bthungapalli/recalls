import { Component ,Input} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Registration} from '../registration/registration.model';
import {LoginService} from './login.service';
import {DashboardService} from '../../dashboard/dashboard.service';
import {SpinnerService} from '../spinner.service';

@Component({
  selector: 'login',
  templateUrl:"./app/components/home/login/login.html"
})
export class LoginComponent{

public errorMessage:String="";
public loginModel: Registration;
public spinner:boolean;

constructor(private loginService:LoginService,private router:Router,private dashboardService:DashboardService,private spinnerService:SpinnerService) {
    this.loginModel = new Registration();
}

submitLogin(){
this.spinnerService.emitChange(true);

     this.errorMessage="";
      this.loginService.submitLogin(this.loginModel)
      .subscribe(response => {
                  if(response==null){
                  this.errorMessage="Email or Password is incorrect";
                  }else{
                     if(!response.isActive){
                          this.errorMessage="Your account is inactive.Please contact administrator";
                     }if(!response.registrationConfirmed){
                          this.errorMessage="Your account is not activated.Please click the link in Register confirmation mail";
                     }else{
                          this.dashboardService.setUserToProfile(response);
                          this.router.navigate(['dashboard/recalls']);
                          this.spinnerService.emitChange(false);
                     }
                  }
                  this.spinnerService.emitChange(false);
                  },err => {
                  this.errorMessage="Something went wrong.Please contact administrator";
                  this.spinnerService.emitChange(false);
      });


}

}
