import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Registration} from './registration.model';
import {Observable} from 'rxjs';

@Injectable()
export class RegistrationService {

      constructor(private http: Http,) {
      }

      submitSignUp(registrationModel:Registration): void {
       console.log("this.contants.REGISTRATION_URL");
      }

 }
