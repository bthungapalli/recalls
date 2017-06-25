import { Component,Injectable } from '@angular/core';
import {Http, URLSearchParams, Response, Headers, RequestOptions} from '@angular/http';
import {Recall} from './Recalls.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RecallsService {

      private  GET_ALL_RECALLS_URL="/recalls/allRecalls";
      private  GET_CREATE_RECALL_URL="/recalls/createRecall";


      constructor(private http: Http) {
      }

      getAllRecalls(): Observable<Recall[]> {
       return this.http.get(this.GET_ALL_RECALLS_URL)
       .map((res: Response) => {return res.json();})
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }

      submitRecall(recallModel:Recall):Observable<Recall>{
      return this.http.post(this.GET_CREATE_RECALL_URL,recallModel)
      .map((res: Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
      }


 }
