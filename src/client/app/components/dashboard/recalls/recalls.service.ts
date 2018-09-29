import { Component, Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { Recall } from './recalls.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecallsService {

      private GET_ALL_RECALLS_URL = "/api/recalls/allRecalls";
      private GET_CREATE_RECALL_URL = "/api/recalls/createRecall";
      private GET_RECALLS_BY_FILTER_URL = "/api/recalls/filterRecalls";
      private DELETE_RECALL_URL = "/api/recalls/";
      private GET_RECALL_URL = "/api/recalls/";
      private GET_FOOD_RECALL_URL = "/api/recalls/food/";
      private GET_DRUGS_RECALL_URL = "/api/recalls/drugs/";
      private DOWNLOAD_URL = "/api/recalls/download/";
      private GET_SHOW_RECALL_URL = "/api/recalls/showRecall/";
      private GET_CREATE_BULK_RECALL_URL = "/api/recalls/createBulkRecall";
      private POST_FOOD_RECALL_URL = "/api/recalls/saveRecall";


      constructor(private http: Http) {
      }

      getAllRecalls(): Observable<any> {
            return this.http.get(this.GET_ALL_RECALLS_URL)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

      submitRecall(recallModel: Recall): Observable<any> {
            return this.http.post(this.GET_CREATE_RECALL_URL, recallModel)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }


      getRecallsForFilter(category: String, toDate: String, fromDate: String): Observable<any> {
            var body = { "category": category, "toDate": toDate, "fromDate": fromDate }
            return this.http.post(this.GET_RECALLS_BY_FILTER_URL, body)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

      deleteRecall(id: String): Observable<any> {
            return this.http.delete(this.DELETE_RECALL_URL + id)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

      getRecall(id: String, category: String): Observable<any> {
            var URL = this.GET_RECALL_URL;
            if (category === 'Food') {
                  URL = this.GET_FOOD_RECALL_URL;
            } else if (category === 'Drugs') {
                  URL = this.GET_DRUGS_RECALL_URL;
            }
            return this.http.get(URL + id)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

      showRecall(id: String): Observable<any> {
            return this.http.get(this.GET_SHOW_RECALL_URL + id)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

      submitRecalls(recalls: any): Observable<any> {
            return this.http.post(this.GET_CREATE_BULK_RECALL_URL, recalls)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

      saveRecall(data: any): Observable<any> {
            return this.http.post(this.POST_FOOD_RECALL_URL, data)
                  .map((res: Response) => { return res.json(); })
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

}
