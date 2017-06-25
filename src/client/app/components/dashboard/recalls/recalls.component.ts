import { Component,OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';



@Component({
  selector: 'recalls',
  templateUrl:"./app/components/dashboard/recalls/recalls.html"
})
export class RecallsComponent implements OnInit{

      public errorMessage:String="";
      public successMessage:String="";
      public recalls:Recall[]=[];

      constructor(private recallsService:RecallsService) {

      }

      ngOnInit(): void {
      this.recallsService.getAllRecalls().subscribe(response => {
           this.recalls=response;
      },err => {
          this.errorMessage="Something went wrong.Please contact administrator";
      });
      };

 }
