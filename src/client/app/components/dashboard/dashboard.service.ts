import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import { Registration } from '../home/registration/registration.model';
import { Profile } from './profile/profile.model';


@Injectable()
export class DashboardService {

      public  userDetails:Profile;
      public LOGOUT_URL="/logout";

      constructor(private http: Http) {
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

      logout(): Observable<any> {
       return this.http.get(this.LOGOUT_URL)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


 }
