import { Component,Input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Registration} from '../registration/registration.model';
import {ForgotPasswordService} from './forgotPassword.service';
import {SpinnerService} from '../spinner.service';


@Component({
  selector: 'forgotPassword',
  templateUrl:"./app/components/home/forgotPassword/forgotPassword.html"
})
export class ForgotPasswordComponent{

public errorMessage:String="";
public successMessage:String="";
public forgotPasswordModel: Registration;
public spinner:boolean;

constructor(private forgotPasswordService:ForgotPasswordService,private router:Router,private spinnerService:SpinnerService) {
    this.forgotPasswordModel = new Registration();
}

submitForgotPassword(){
this.spinnerService.emitChange(true);
     this.errorMessage="";
      this.successMessage="";
      this.forgotPasswordService.submitForgotPassword(this.forgotPasswordModel)
      .subscribe(response => {
                  if(response.emailSent){
                  this.successMessage="Mail sent";
                  }else{
                    this.errorMessage="Email does not exist,Please Sign In";
                  }
                  this.spinnerService.emitChange(false);
                  },err => {
                  this.errorMessage="Something went wrong.Please contact administrator";
                  this.spinnerService.emitChange(false);
      });


}

}
