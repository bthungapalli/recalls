import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {Registration} from './registration.model';
import {RegistrationService} from './registration.service';


@Component({
  selector: 'registration',
  templateUrl:"./app/components/home/registration/registration.html"
})
export class RegistrationComponent {

      public errorMessage:String="";
      public registrationModel: Registration;

      constructor(private registrationService:RegistrationService) {
          this.registrationModel = new Registration();
      }

      submitSignUp(){
        this.errorMessage="";
        if(this.registrationModel.password===this.registrationModel.confirmPassword){
            this.registrationService.submitSignUp(this.registrationModel).subscribe(response => {
                console.log(response);
            },err => {
                                    console.log(err);
            });
        }else{
            this.errorMessage="Password and ConfirmPassword dint match";
        }

      }

 }
