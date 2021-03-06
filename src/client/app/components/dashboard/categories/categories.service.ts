import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Category} from './categories.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoriesService {

      private  GET_ALL_CATEGORIES_URL="/categories/allCategories";
      private  GET_CREATE_CATEGORY_URL="/categories/createCategory";
      private  GET_DELETE_CATEGORY_URL="/categories/deleteCategory";
      private  GET_REQUEST_CATEGORY_URL="/categories/requestCategory";


      constructor(private http: Http) {
      }

      getAllCategories(): Observable<any> {
       return this.http.get(this.GET_ALL_CATEGORIES_URL)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      createCategory(categoryModel:Category):Observable<any>{
      return this.http.post(this.GET_CREATE_CATEGORY_URL,categoryModel)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      deleteCategory(categoryModel:Category):Observable<any>{
      return this.http.post(this.GET_DELETE_CATEGORY_URL,categoryModel)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }
    
      requestCategory(categoryName:String):Observable<any>{
      return this.http.post(this.GET_REQUEST_CATEGORY_URL,{"categoryName":categoryName})
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

 }
