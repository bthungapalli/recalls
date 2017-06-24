import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Category} from './Categories.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CategoriesService {

      private  GET_ALL_CATEGORIES_URL="/categories/allCategories";


      constructor(private http: Http) {
      }

      getAllCategories(): Observable<Category[]> {
       return this.http.get(this.GET_ALL_CATEGORIES_URL)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

 }
