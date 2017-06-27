import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Recall} from './Recalls.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RecallsService {

      private  GET_ALL_RECALLS_URL="/recalls/allRecalls";
      private  GET_CREATE_RECALL_URL="/recalls/createRecall";
      private  GET_RECALLS_BY_FILTER_URL="/recalls/filterRecalls";
      private  DELETE_RECALL_URL="/recalls/";
      private  GET_RECALL_URL="/recalls/";



      constructor(private http: Http) {
      }

      getAllRecalls(): Observable<any> {
       return this.http.get(this.GET_ALL_RECALLS_URL)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      submitRecall(recallModel:Recall):Observable<any>{
      return this.http.post(this.GET_CREATE_RECALL_URL,recallModel)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


      getRecallsForFilter(category:String,toDate:String,fromDate:String):Observable<any>{
      var body={"category":category,"toDate":toDate,"fromDate":fromDate}
      return this.http.post(this.GET_RECALLS_BY_FILTER_URL,body)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      deleteRecall(id:String):Observable<any>{
      return this.http.delete(this.DELETE_RECALL_URL+id)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      getRecall(id:String):Observable<any>{
      return this.http.get(this.GET_RECALL_URL+id)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


 }
