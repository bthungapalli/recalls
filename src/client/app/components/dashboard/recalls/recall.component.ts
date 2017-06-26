import { Component,OnInit,AfterViewInit,OnDestroy } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {Recall} from './recalls.model';
import {RecallsService} from './recalls.service';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.model';

declare var tinymce: any;

@Component({
  selector: 'recall',
  templateUrl:"./app/components/dashboard/recalls/recall.html"
})
export class RecallComponent implements OnInit,AfterViewInit, OnDestroy{

      public errorMessage:String="";
      public successMessage:String="";
      public recallModel:Recall;
      public categories:Category[]=[];
      public  description:any="";
      public editor:any;

      constructor(private recallsService:RecallsService,private categoriesService:CategoriesService,private router:Router) {
         this.recallModel=new Recall();
         this.recallModel.categoryName="Select Category";
      }

      ngOnInit(): void {
          this.categoriesService.getAllCategories().subscribe(response => {
              if(response.sessionExpired){
                this.router.navigate(['home']);
              }else{
                this.categories=response;
              }

          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });

      };


      ngAfterViewInit() {
          tinymce.init({
            selector: '#description',
            plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            
            setup: editor => {
              this.editor=editor;
              editor.on('keyup', () => {
                this.description= editor.getContent();
              });
            },
          });
        }

      submitRecall(){
      this.recallModel.description=this.description;
          this.recallsService.submitRecall(this.recallModel).subscribe(response => {

               if(response.sessionExpired){
                 this.router.navigate(['home']);
               }else{
                 this.router.navigate(['dashboard/recalls']);
               }
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
      }


              ngOnDestroy() {
              tinymce.remove(this.editor);

              }
 }
