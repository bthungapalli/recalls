import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Registration} from './registration.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RegistrationService {

      private  REGISTRATION_POST_URL="/registration";
      private  CHECK_EMAIL_POST_URL="/registration/checkEmail";

      constructor(private http: Http) {
      }

      submitSignUp(registrationModel:Registration): Observable<Registration> {
       return this.http.post(this.REGISTRATION_POST_URL,registrationModel)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      checkEmail(registrationModel:Registration): Observable<any> {
       return this.http.post(this.CHECK_EMAIL_POST_URL,registrationModel)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }



 }
