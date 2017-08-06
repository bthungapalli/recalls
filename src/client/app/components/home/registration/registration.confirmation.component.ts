import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RegistrationService} from './registration.service';


@Component({
  selector: 'registrationConfirmation',
  template:""
})
export class RegistrationConfirmationComponent {

      public errorMessage:String="";

      constructor(private registrationService:RegistrationService,private router:Router,private activatedRoute: ActivatedRoute) {
          
            let token = this.activatedRoute.snapshot.queryParams["token"];
           this.registrationService.checkToken(token).subscribe(response => {
              console.log(response)
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
          
          
          
      }

 }
