import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Registration} from '../registration/registration.model';
import {LoginService} from './login.service';
import {DashboardService} from '../../dashboard/dashboard.service';


@Component({
  selector: 'login',
  templateUrl:"./app/components/home/login/login.html"
})
export class LoginComponent{

public errorMessage:String="";
public loginModel: Registration;

constructor(private loginService:LoginService,private router:Router,private dashboardService:DashboardService) {
    this.loginModel = new Registration();
}

submitLogin(){
     this.errorMessage="";
      this.loginService.submitLogin(this.loginModel)
      .subscribe(response => {
                  if(response==null){
                  this.errorMessage="Email or Password is incorrect";
                  }else{
                     if(!response.isActive){
                          this.errorMessage="Your account is inactive.Please contact administrator";
                     }else{
                          this.dashboardService.setUserToProfile(response);
                          this.router.navigate(['dashboard/profile']);
                     }
                  }
                  },err => {
                  this.errorMessage="Something went wrong.Please contact administrator";
      });


}

}
