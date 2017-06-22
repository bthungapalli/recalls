import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Profile} from './profile.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ProfileService {

      private  PROFILE_UPDATE_URL="/profile";

      constructor(private http: Http) {
      }

      submitProfile(profileModel:Profile): Observable<Profile> {
       return this.http.put(this.PROFILE_UPDATE_URL,profileModel)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

 }
