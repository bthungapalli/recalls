import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { TitleCasePipe } from '../../shared/data.filter';

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
export class RecallComponent implements OnInit, OnDestroy{

      public errorMessage:string="";
      public successMessage:string="";
      public recallModel:Recall= new Recall();
      public categories:string[]=[];
      public  description:any="";
      public editor:any;
      public recallId:any;
      public profile:Profile;
      public vehicle:Vehicle=new Vehicle();
      public fileUploadURL:string= (<any> window).origin+'/api/recalls/fileUpload';
      public uploader:FileUploader = new FileUploader({url:this.fileUploadURL});

      public userTemplateUploadURL:string= (<any> window).origin+'/api/recalls/upload/userExcel';
      public userTemplateUploader:FileUploader = new FileUploader({url:this.userTemplateUploadURL});

      public subCategoriesArray:any=[];
      public subCategoriesData:any=[];
      public selectedCategory:any="Select Category";
      public selectedSubcategories:any=[];
      public category:any;
      public urlPath:string='';
      public userTemplateError:string="";
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
    this.urlPath=window.location.origin+"/api/recalls/template/userExcel";
      if(this.recallId){
      this.spinnerService.emitChange(true);
      this.recallsService.getRecall(this.recallId).subscribe(response => {
              if(response.sessionExpired){
              this.spinnerService.emitChange(false);
                this.router.navigate(['home']);
              }else{
              this.recallModel=response;
              }
              
              var temp=response.categoryName.split("~");
              this.category=temp[0];
              for(var i=1;i<=temp.length;i++){
                this.subCategoriesArray.push(temp[i]);
              }
              
          if(this.recallModel.categoryName==="Boats and Boating Safety"){
             this.recallModel.caseOpenDate= { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth()+1, "day": new Date(response.recallDate).getDate() } };
              this.recallModel.caseCloseDate= { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth()+1, "day": new Date(response.recallDate).getDate() } };
              this.recallModel.campaignOpenDate= { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth()+1, "day": new Date(response.recallDate).getDate() } };
              this.recallModel.campaignCloseDate={ "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth()+1, "day": new Date(response.recallDate).getDate() } };
           }else if(this.recallModel.categoryName==="Consumer Products"){
             this.recallModel.recallDate= { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth()+1, "day": new Date(response.recallDate).getDate() } };
           }else if(this.recallModel.categoryName==="Foods, Medicines, Cosmetics"){
             this.recallModel.immediateRelease= { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth()+1, "day": new Date(response.recallDate).getDate() } };
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
      }

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

      this.spinnerService.emitChange(true);
          
         if(this.recallModel.categoryName==="Boats and Boating Safety"){
             this.recallModel.caseOpenDate= (<any> this.recallModel.caseOpenDate).formatted;
              this.recallModel.caseCloseDate=(<any> this.recallModel.caseCloseDate).formatted;
              this.recallModel.campaignOpenDate= (<any>this.recallModel.campaignOpenDate).formatted;
              this.recallModel.campaignCloseDate= (<any>this.recallModel.campaignCloseDate).formatted;
           }else if(this.recallModel.categoryName==="Consumer Products"){
             this.recallModel.recallDate= (<any>this.recallModel.recallDate).formatted;
           }else if(this.recallModel.categoryName==="Foods, Medicines, Cosmetics"){
             this.recallModel.immediateRelease= (<any>this.recallModel.immediateRelease).formatted;
           }  

            if( this.userTemplateUploader.queue.length>0){
              this.saveUserTemplate();
            }else{
              this.processRecall();
            }     
      }
    

    saveUserTemplate(){
      var thisObject=this;
      thisObject.userTemplateError="";
      this.userTemplateUploader.queue.forEach(function(item){
        item.upload();
       });
      this.userTemplateUploader.onCompleteItem = (item, response, status, header) => {
        var responseJson=JSON.parse(response);
        var externalUsers=[];
        var rows="";
        responseJson.data.forEach((obj,index)=>{
          if(obj.name!=undefined  && obj.emailid!=undefined   && ((obj.name=="" && obj.emailid!=='') || (obj.name!=="" && obj.emailid==''))){
            var row = index+2;
            rows=rows+row+",";
          }
          if(obj.name!=undefined  && obj.emailid!=undefined  && obj.name!=="" && obj.emailid!==''){
            externalUsers.push({
              "name":obj.name,
              "emailid":obj.emailid
            })
          }
        });
        if(externalUsers.length==0 && rows==""){
          thisObject.userTemplateError="Template Corrupted,Please upload again";
          thisObject.spinnerService.emitChange(false);
        }else if (rows!=""){
          thisObject.userTemplateError="Details missing ,Please Check "+rows+" row(s)";
          thisObject.spinnerService.emitChange(false);
        }else{
          thisObject.recallModel.externalUsers=externalUsers;
          thisObject.processRecall();
        }
        
      }
    }; 

    processRecall(){
            var thisObject=this;
            if((this.recallModel.categoryName==="Tires" || this.recallModel.categoryName==="Child Safety Seats" || this.recallModel.categoryName==="Motor Vehicles") && this.uploader.queue.length>0){
              var files=[];
          var noOfFiles=this.uploader.queue.length;
          this.uploader.queue.forEach(function(item){
              item.upload();
          });
          var successCalls=0;
          this.uploader.onCompleteItem = (item, response, status, header) => {
              if (status === 200) {
                  ++successCalls;
                  files.push(JSON.parse(response).filename);
                  if(successCalls==noOfFiles){
                      files.forEach(function(file){
                          thisObject.recallModel.files.push(file);
                      });
                    
                        thisObject.createRecall(thisObject);
                      
                      
                  }
              }else{
                thisObject.errorMessage="Something went wrong.Please contact administrator";
                thisObject.spinnerService.emitChange(false);
              }    
            }
          }else{
          if(!this.recallId){
              let temp=thisObject.selectedCategory.categoryName;;
              thisObject.subCategoriesArray.forEach((data,index)=>{
                  temp=temp+"~"+data.toUpperCase();
              });
              thisObject.recallModel.categoryName=temp;
              thisObject.recallModel.subCategories=this.selectedCategory.subCategories;
            }
                
              thisObject.createRecall(thisObject);
            
          }   
    }

    createRecall(thisObject){
      thisObject.recallsService.submitRecall(thisObject.recallModel).subscribe(response => {
        thisObject.spinnerService.emitChange(false);
             if(response.sessionExpired){
               thisObject.router.navigate(['home']);
             }else{
               if(!response.alreadyExist){
                thisObject.dashboardService.userDetails.categories=response.categories;
               }
               thisObject.router.navigate(['dashboard/recalls']);
             }
        },err => {
            thisObject.errorMessage="Something went wrong.Please contact administrator";
            thisObject.spinnerService.emitChange(false);
        });
    };

    showSubCategories(index){
        if(index===0){
          this.subCategoriesArray=[];
          this.subCategoriesData=[];
          this.changeCategory();
        }
        
          if(index!==this.selectedCategory.subCategories.length){
            this.subCategoriesData[index]=[];
            let key= this.selectedCategory.subCategories[index];
            this.subCategoriesArray[index]="Select "+key;
            this.selectedCategory.rows.forEach(row => {
              if(index>0 && this.subCategoriesArray[index-1]===row[this.selectedCategory.subCategories[index-1]]){
                this.subCategoriesData[index].push(row[key]);
            }
            if(index===0){
              if(this.subCategoriesData[index].indexOf(row[key])===-1){
                this.subCategoriesData[index].push(row[key]);
             }
            }
            });
          }
       
    };

    isSubCategoryValid(){
      let isInvalid=true;
      if(this.recallId){
        isInvalid=false;
      }else{
        if(this.selectedCategory!=='Select Cateogry' && this.selectedCategory.subCategories!==undefined && this.subCategoriesArray.length===this.selectedCategory.subCategories.length){
          let i=0;
          this.subCategoriesArray.forEach((subCategory,index) => {
              if(subCategory.includes("Select")){
                i++;
              }
           }); 
           if(i==0){
              isInvalid=false;
           }
      }
      }
     
      return isInvalid;
    };
   
    changeCategory(){
       
        this.recallModel=new Recall();
        
       this.recallModel.categoryName=this.selectedCategory.categoryName;
         tinymce.remove(this.editor);
        var callTinyMCE= this.callTinyMCE;
        this.uploader=new FileUploader({url:this.fileUploadURL});
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

    
    deleteFile(index){
         var temp=JSON.parse(JSON.stringify(this.recallModel.files));
        temp.splice(index,1);
         this.recallModel.files=[];
         this.recallModel.files=temp;
    }

              ngOnDestroy() {
              tinymce.remove(this.editor);

              }
 }
