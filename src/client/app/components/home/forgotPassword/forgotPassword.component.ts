import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Registration} from '../registration/registration.model';
import {ForgotPasswordService} from './forgotPassword.service';


@Component({
  selector: 'forgotPassword',
  templateUrl:"./app/components/home/forgotPassword/forgotPassword.html"
})
export class ForgotPasswordComponent{

public errorMessage:String="";
public successMessage:String="";
public forgotPasswordModel: Registration;

constructor(private forgotPasswordService:ForgotPasswordService,private router:Router) {
    this.forgotPasswordModel = new Registration();
}

submitForgotPassword(){
     this.errorMessage="";
      this.successMessage="";
      this.forgotPasswordService.submitForgotPassword(this.forgotPasswordModel)
      .subscribe(response => {
                  if(response==null){
                  this.errorMessage="Email does not exist,Please Sign In";
                  }else{
                    this.successMessage="Mail sent";
                  }
                  },err => {
                  this.errorMessage="Something went wrong.Please contact administrator";
      });


}

}
