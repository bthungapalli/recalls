import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Profile} from '../profile/profile.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserManagementService {

      private  GET_ALL_USERS_URL="/userManagement/allUsers";
      private  ACTIVATE_OR_INACTIVATE_URL="/userManagement/activeOrInActivateUser";

      constructor(private http: Http) {
      }

      getAllUsers(): Observable<Profile[]> {
       return this.http.get(this.GET_ALL_USERS_URL)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      activeOrInActivateUser(user:Profile): Observable<Profile> {
       return this.http.put(this.ACTIVATE_OR_INACTIVATE_URL,user)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

 }
