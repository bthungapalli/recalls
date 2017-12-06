import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Category} from './../categories/categories.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SubCategoriesService {


      private  GET_CREATE_SUB_CATEGORY_URL="/subCategories/createSubCategory";
      private  GET_DELETE_SUB_CATEGORY_URL="/subCategories/deleteSubCategory";

      

      constructor(private http: Http) {
      }

     

      createSubCategory(categoryModel:Category):Observable<any>{
      return this.http.post(this.GET_CREATE_SUB_CATEGORY_URL,categoryModel)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      deleteSubCategory(categoryModel:Category):Observable<any>{
      return this.http.post(this.GET_DELETE_SUB_CATEGORY_URL,categoryModel)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }
    
     

 }
