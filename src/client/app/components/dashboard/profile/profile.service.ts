import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Profile} from './profile.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {

      private  PROFILE_UPDATE_URL="/profile";
    private  PROFILE_GET_URL="/profile";

      constructor(private http: Http) {
      }

      submitProfile(profileModel:Profile): Observable<any> {
       return this.http.put(this.PROFILE_UPDATE_URL,profileModel)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }
    
    getUser(): Observable<any> {
       return this.http.get(this.PROFILE_GET_URL)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }
    
    

 }
