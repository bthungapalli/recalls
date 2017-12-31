import { Component } from '@angular/core';
import {SpinnerService} from './spinner.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RegistrationService} from './registration/registration.service';

@Component({
  selector: 'login',
  templateUrl:"./app/components/home/home.html"
})
export class HomeComponent{

public spinner:boolean;
      public errorMessage:String="";
    public successMessage:String="";

constructor(private spinnerService: SpinnerService,private registrationService:RegistrationService,private router:Router,private activatedRoute: ActivatedRoute) {
    
    
      let token = this.activatedRoute.snapshot.queryParams["token"];
    
    if(token!==undefined){

        setTimeout(() => {
            this.successMessage="";
            this.errorMessage="";
          }, 5000);
         
        this.registrationService.checkToken(token).subscribe(response => {
               if(response.token){
                   this.successMessage="Successfully User Activated";
               }else{
                    this.errorMessage="Invalid token";
                }
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
     }
    
     spinnerService.changeEmitted$.subscribe(
       text => {
           this.spinner=text;
       });
    
     }
 }
