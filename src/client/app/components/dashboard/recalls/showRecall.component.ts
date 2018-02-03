import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';
import {SpinnerService} from '../spinner.service';

@Component({
  selector: 'showrecall',
  templateUrl:"./app/components/dashboard/recalls/showRecall.html"
})
export class ShowRecallComponent implements OnInit, OnDestroy{

      private recallId:any;
      private errorMessage:any;
      public recallModel:Recall= new Recall();
     
      constructor(private recallsService:RecallsService,private router:Router,private activatedRoute: ActivatedRoute,private spinnerService:SpinnerService) {
        
      }
    

      ngOnInit(): void {
        this.activatedRoute.params.subscribe(
          (params : Params) => {
             this.recallId = params["recallId"];
          });
          this.spinnerService.emitChange(true);
          this.recallsService.showRecall(this.recallId).subscribe(response => {
          console.log(JSON.stringify(response))
          this.recallModel=response;
          this.spinnerService.emitChange(false);
        },err => {
            this.errorMessage="Trying to fetch invalid Recall ";
            this.spinnerService.emitChange(false);
        });
        };
    
        goto(){
          this.router.navigate(['home']);
        };
      
   

              ngOnDestroy() {
              

              }
 };
