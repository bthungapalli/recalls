import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {Registration} from './registration.model';
import {RegistrationService} from './registration.service';


@Component({
  selector: 'registration',
  templateUrl:"./app/components/home/registration/registration.html"
})
export class RegistrationComponent {

      public registrationModel: Registration;
      
      constructor(private registrationService:RegistrationService) {
          this.registrationModel = new Registration();
      }

      submitSignUp(){
        this.registrationService.submitSignUp(this.registrationModel);
      }

 }
