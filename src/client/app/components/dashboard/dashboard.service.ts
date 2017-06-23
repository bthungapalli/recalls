import { Component,Injectable } from '@angular/core';
import { Registration } from '../home/registration/registration.model';
import { Profile } from './profile/profile.model';


@Injectable()
export class DashboardService {

      public  userDetails:Profile;

      constructor(){
      this.userDetails= new Profile();
      }

      setUserToProfile(login:Registration){
       this.userDetails._id=login._id;
       this.userDetails.firstName=login.firstName;
       this.userDetails.lastName=login.lastName;
       this.userDetails.email=login.email;
       this.userDetails.password=login.password;
       this.userDetails.mobileNumber=login.mobileNumber;
       this.userDetails.street=login.street;
       this.userDetails.city=login.city;
       this.userDetails.state=login.state;
       this.userDetails.zipcode=login.zipcode;
       this.userDetails.alertsOn=login.alertsOn;
      }


 }
