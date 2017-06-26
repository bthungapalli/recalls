import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Registration} from '../registration/registration.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ForgotPasswordService {

      private  FORGOT_PASSWORD_POST_URL="/forgotPassword/";

      constructor(private http: Http) {
      }

      submitForgotPassword(forgotPasswordModel:Registration): Observable<any> {
       return this.http.post(this.FORGOT_PASSWORD_POST_URL+forgotPasswordModel.email,forgotPasswordModel)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

 }
