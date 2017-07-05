import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Registration} from '../registration/registration.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

      private  LOGIN_POST_URL="/login";

      constructor(private http: Http) {
      }

      submitLogin(loginModel:Registration): Observable<Registration> {
       return this.http.post(this.LOGIN_POST_URL,loginModel)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

 }
