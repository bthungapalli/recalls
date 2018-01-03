import { Component,Input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {Registration} from './registration.model';
import {RegistrationService} from './registration.service';
import {DashboardService} from '../../dashboard/dashboard.service';
import {SpinnerService} from '../spinner.service';
import {CategoriesService} from '../../dashboard/categories/categories.service';
import {Category} from '../../dashboard/categories/categories.model';


@Component({
  selector: 'registration',
  templateUrl:"./app/components/home/registration/registration.html"
})
export class RegistrationComponent {

      public errorMessage:String="";
     public successMessage:String="";
      public registrationModel: Registration;
      public spinner:boolean;
      public isEmailAlert:boolean;
      public isMobileAlert:boolean;
      public mainCategories:Category[]=[];
      public categories:Category[]=[];
      public subCategoriesArray:any=[];
      public subCategoriesData:any=[];
      public selectedCategory:any="Select Category";
      public selectedSubcategories:any=[];

      constructor(private registrationService:RegistrationService,private router:Router,private dashboardService:DashboardService,private spinnerService:SpinnerService,private categoriesService:CategoriesService) {
          this.registrationModel = new Registration();
          this.categoriesService.getAllCategories().subscribe(response => {
                   this.categories=response;
                   this.mainCategories=JSON.parse(JSON.stringify(response));
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
      }

      isSubCategoryValid(){
        let isInvalid=true;
        if(this.selectedCategory!=="Select Category" && this.subCategoriesArray.length===this.selectedCategory.subCategories.length){
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
        return isInvalid;
      };

      showSubCategories(index){
          if(index===0){
            this.subCategoriesArray=[];
            this.subCategoriesData=[];
          }
          if(index!==this.selectedCategory.subCategories.length){
            this.subCategoriesData[index]=[];
            let key= this.selectedCategory.subCategories[index];
            this.subCategoriesArray[index]="Select "+key;
            this.selectedCategory.rows.forEach(row => {
                
                if(index===0){
                    if(this.subCategoriesData[index].indexOf(row[key])===-1){
                        this.subCategoriesData[index].push(row[key]);
                    }
                }
                if(index===this.selectedCategory.subCategories.length-1){
                   if(this.subCategoriesData[index].indexOf(row[key])===-1){
                    this.subCategoriesData[index].push(row[key]);
                   }
                }else if(index>0 && ( this.subCategoriesArray[index-1]==='All' || this.subCategoriesArray[index-1]===row[this.selectedCategory.subCategories[index-1]])){
                    this.subCategoriesData[index].push(row[key]);
                }
                
            });
          }
      };

      addSubCategory(){
    
        let temp={};
        let tempSubCategory;
        let rowIndex;
        this.selectedCategory.subCategories.forEach((category,index) => {
            temp[category]=this.subCategoriesArray[index]
        }); 

        let categoryDoesNotExist=true;
        
        this.selectedSubcategories.forEach(category=>{
            if(category.categoryName===this.selectedCategory.categoryName){
                categoryDoesNotExist=false;
                tempSubCategory=category;
            }
        });

        if(categoryDoesNotExist){
            tempSubCategory={
                "categoryName": this.selectedCategory.categoryName,
                "subCategories":this.selectedCategory.subCategories,
                "rows":[]
            };
        }

        this.buildSubCategories(tempSubCategory);
        if(categoryDoesNotExist){
            this.selectedSubcategories.push(tempSubCategory);
        }

        this.selectedCategory="Select Category";
        this.subCategoriesArray=[];
        this.subCategoriesData=[];
      };

      buildSubCategories(tempSubCategory){
       
        var temp=[];
        this.subCategoriesArray.forEach((category,index) => {
            // if(category==="All"){
            //     temp[index]=this.subCategoriesData[index];
            // }else{
                temp[index]=[category];
            //}
        }); 

        if(temp.length===3){

            for(var i=0;i<temp[0].length;i++){

                for(var j=0;j<temp[1].length;j++){

                    for(var k=0;k<temp[2].length;k++){
                        var tempObject={};
                        tempObject[this.selectedCategory.subCategories[0]]=temp[0][i];
                        tempObject[this.selectedCategory.subCategories[1]]=temp[1][j];
                        tempObject[this.selectedCategory.subCategories[2]]=temp[2][k];
                        var dontExist=true;
                        tempSubCategory.rows.forEach(row=>{
                            if(JSON.stringify(row) === JSON.stringify(tempObject)){
                                dontExist=false;
                            }
                        })
                        if(dontExist){
                            tempSubCategory.rows.push(tempObject);
                        }
                    }
                    
                }

            }

        }
        

      }

      submitSignUp(){
      this.spinnerService.emitChange(true);
        this.errorMessage="";
        if(this.registrationModel.password===this.registrationModel.confirmPassword){
            
            if(this.isEmailAlert && this.isMobileAlert){
                this.registrationModel.alertsOn=["Email","Mobile"];
            }else if(this.isEmailAlert){
                this.registrationModel.alertsOn=["Email"];
            }else if(this.isMobileAlert){
                this.registrationModel.alertsOn=["Mobile"];
            }
            this.registrationModel.categories=this.selectedSubcategories;
            this.registrationService.submitSignUp(this.registrationModel).subscribe(response => {
                 this.successMessage="Successfully Registered, Activation Link Mailed";
                 this.registrationModel = new Registration();
                 this.selectedSubcategories=[];  
                this.selectedCategory="Select Category";
                this.subCategoriesArray=[];
                this.subCategoriesData=[];
                this.categories=JSON.parse(JSON.stringify(this.mainCategories));
//            this.dashboardService.setUserToProfile(response);
//            this.router.navigate(['dashboard/profile']);
                this.spinnerService.emitChange(false);
            },err => {
                                    this.errorMessage="Something went wrong.Please contact administrator";
                                    this.spinnerService.emitChange(false);
            });
        }else{
            this.errorMessage="Password and ConfirmPassword dint match";
            this.spinnerService.emitChange(false);
        }

      }

      checkEmail(){
      this.errorMessage="";
      this.registrationService.checkEmail(this.registrationModel).subscribe(response => {

              if(response.alreadyExist){
              this.errorMessage="Email already exist";
              }
          },err => {
              console.log(err);
          });
      }

 }
