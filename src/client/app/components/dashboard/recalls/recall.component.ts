import { Component,OnInit,AfterViewInit,OnDestroy } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.model';
import {SpinnerService} from '../spinner.service';
import {Profile} from '../profile/profile.model';
import {DashboardService} from '../dashboard.service';
import {Vehicle} from './vehicle.model';

declare var tinymce: any;

@Component({
  selector: 'recall',
  templateUrl:"./app/components/dashboard/recalls/recall.html"
})
export class RecallComponent implements OnInit, OnDestroy,AfterViewInit{

      public errorMessage:String="";
      public successMessage:String="";
      public recallModel:Recall= new Recall();
      public categories:String[]=[];
      public  description:any="";
      public editor:any;
      public recallId:any;
      public profile:Profile;
      public vehicle:Vehicle=new Vehicle();
    
      constructor(private recallsService:RecallsService,private categoriesService:CategoriesService,private router:Router,private activatedRoute: ActivatedRoute,private spinnerService:SpinnerService,private dashboardService:DashboardService) {
         this.recallModel=new Recall();
         this.profile=dashboardService.userDetails;
         this.categories=this.profile.categories;
      }
    

      ngOnInit(): void {

      this.activatedRoute.params.subscribe(
       (params : Params) => {
          this.recallId = params["id"];
       }
    );

      if(this.recallId){
      this.spinnerService.emitChange(true);
      this.recallsService.getRecall(this.recallId).subscribe(response => {
              if(response.sessionExpired){
              this.spinnerService.emitChange(false);
                this.router.navigate(['home']);
              }else{
              this.recallModel=response;
              }
          if(this.recallModel.categoryName==="Boats and Boating Safety"){
             this.recallModel.caseOpenDate= { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth()+1, day: new Date(response.recallDate).getDate() } };
              this.recallModel.caseCloseDate= { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth()+1, day: new Date(response.recallDate).getDate() } };
              this.recallModel.campaignOpenDate= { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth()+1, day: new Date(response.recallDate).getDate() } };
              this.recallModel.campaignCloseDate={ date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth()+1, day: new Date(response.recallDate).getDate() } };
           }else if(this.recallModel.categoryName==="Consumer Products"){
             this.recallModel.recallDate= { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth()+1, day: new Date(response.recallDate).getDate() } };
           }else if(this.recallModel.categoryName==="Foods, Medicines, Cosmetics"){
             this.recallModel.immediateRelease= { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth()+1, day: new Date(response.recallDate).getDate() } };
           }  
          var callTinyMCE= this.callTinyMCE;
        var thisObject=this;
        setTimeout(function() {
          callTinyMCE(thisObject);
        }, 500);
            this.spinnerService.emitChange(false);
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
              this.spinnerService.emitChange(false);
          });
      }else{
      this.recallModel.categoryName= this.categories[0];    
            var callTinyMCE= this.callTinyMCE;
        var thisObject=this;
        setTimeout(function() {
          callTinyMCE(thisObject);
        }, 500);
      }   
          
//            this.spinnerService.emitChange(true);
//      this.categoriesService.getAllCategories().subscribe(response => {
//              if(response.sessionExpired){
//              this.spinnerService.emitChange(false);
//                this.router.navigate(['home']);
//              }else{
//                this.categories=response;
//              }
//            this.spinnerService.emitChange(false);
//          },err => {
//              this.errorMessage="Something went wrong.Please contact administrator";
//              this.spinnerService.emitChange(false);
//          });

      };


      callTinyMCE(thisObject) {
          var selector="#description"//+this.recallModel.categoryName;
          tinymce.init({
            selector: selector,
            plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',

            setup: editor => {
              thisObject.editor=editor;
                
               editor.on('init', () => {
                   if( thisObject.recallModel.description!=undefined){
                    editor.setContent(thisObject.recallModel.description);
                        thisObject.recallModel.description=editor.getContent();
                    }
                });  
              editor.on('keyup', () => {
                thisObject.recallModel.description= editor.getContent();
              });
            },
          });
        }

      submitRecall(){
      this.spinnerService.emitChange(false);
         if(this.recallModel.categoryName==="Boats and Boating Safety"){
             this.recallModel.caseOpenDate= this.recallModel.caseOpenDate.formatted;
              this.recallModel.caseCloseDate= this.recallModel.caseCloseDate.formatted;
              this.recallModel.campaignOpenDate= this.recallModel.campaignOpenDate.formatted;
              this.recallModel.campaignCloseDate= this.recallModel.campaignCloseDate.formatted;
           }else if(this.recallModel.categoryName==="Consumer Products"){
             this.recallModel.recallDate= this.recallModel.recallDate.formatted;
           }else if(this.recallModel.categoryName==="Foods, Medicines, Cosmetics"){
             this.recallModel.immediateRelease= this.recallModel.immediateRelease.formatted;
           }  
             
          this.recallsService.submitRecall(this.recallModel).subscribe(response => {
          this.spinnerService.emitChange(false);
               if(response.sessionExpired){
                 this.router.navigate(['home']);
               }else{
                 this.router.navigate(['dashboard/recalls']);
               }
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
              this.spinnerService.emitChange(false);
          });
      }
    
    
    changeCategory(){
        var categoryName=this.recallModel.categoryName;
        this.recallModel=new Recall();
        this.recallModel.categoryName=categoryName;
         tinymce.remove(this.editor);
        var callTinyMCE= this.callTinyMCE;
        var thisObject=this;
        setTimeout(function() {
          callTinyMCE(thisObject);
        }, 500);
        
    }
    
    addVehicle(){
        this.recallModel.vehicles.push(this.vehicle);
        this.vehicle=new Vehicle();
    }
    
    
    deleteVehicle(vehicle){
        var temp=JSON.parse(JSON.stringify(this.recallModel.vehicles));
        temp.forEach(function (vehicleTemp,index) {
                 if(vehicleTemp.name.toUpperCase()===vehicle.name.toUpperCase() && vehicleTemp.model.toUpperCase()===vehicle.model.toUpperCase()  && vehicleTemp.year.toUpperCase()===vehicle.year.toUpperCase()){
                 temp.splice(index,1);
                 }
           });
         this.recallModel.vehicles=[];
                  this.recallModel.vehicles=temp;
    }


              ngOnDestroy() {
              tinymce.remove(this.editor);

              }
 }
