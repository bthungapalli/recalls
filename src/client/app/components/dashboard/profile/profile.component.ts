import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import {Profile} from './profile.model';
import {ProfileService} from './profile.service';
import {DashboardService} from '../dashboard.service';
import {SpinnerService} from '../spinner.service';
import {CategoriesService} from '../../dashboard/categories/categories.service';
import {Category} from '../../dashboard/categories/categories.model';

@Component({
  selector: 'profile',
  templateUrl:"./app/components/dashboard/profile/profile.html"
})
export class ProfileComponent {

      public disableFields:boolean=true;
      public errorMessage:String="";
      public successMessage:String="";
      public profileModel: Profile;
      public isEmailAlert:boolean;
      public isMobileAlert:boolean;
      public categories:Category[]=[];
      public mainCategories:Category[]=[];

      public subCategoriesArray:any=[];
      public subCategoriesData:any=[];
      public selectedCategory:any="Select Category";
      public selectedSubcategories:any=[];
      
    private editFlag:boolean=false;
    private editSubcategoryIndex:any;
    private editCategoryIndex:any;
    
      constructor(private profileService:ProfileService,private dashboardService:DashboardService,private router:Router,private spinnerService:SpinnerService,private categoriesService:CategoriesService) {
          this.profileModel = new Profile();
          
          this.spinnerService.emitChange(true);
          
            this.categoriesService.getAllCategories().subscribe(response => {
                   this.categories=response;
                   this.mainCategories=JSON.parse(JSON.stringify(response));
          },err => {
              this.errorMessage="Something went wrong.Please contact administrator";
          });
          
           this.profileService.getUser().subscribe(response => {

            if(response.sessionExpired){
            this.spinnerService.emitChange(false);
              this.router.navigate(['home']);
            }else{
                this.profileModel= (<any>Object).assign({}, response);
                this.selectedSubcategories=this.profileModel.categories;
               this.isEmailAlert=  (<any>this.profileModel.alertsOn).includes("Email");
                this.isMobileAlert=  (<any>this.profileModel.alertsOn).includes("Mobile");
               // this.removeExistingSubcategory();
                this.dashboardService.emitChange(response);
              this.dashboardService.userDetails=response;
              this.spinnerService.emitChange(false);
            }

            },err => {
                this.errorMessage="Something went wrong.Please contact administrator";
                this.spinnerService.emitChange(false);
            });
             
      };

      removeExistingSubcategory(){
          this.profileModel.categories.forEach(profileCategory=>{
            this.categories.forEach(category=>{
                if(category.categoryName===profileCategory.categoryName){
                    
                    profileCategory.rows.forEach(subCategory=>{
                        let temp=JSON.parse(JSON.stringify(category));
                        const orderedSubCategory = {};
                        Object.keys(orderedSubCategory).sort().forEach(function(key) {
                            orderedSubCategory[key] = subCategory[key];
                        });
                        temp.rows.forEach((row,index)=>{
                            const orderedRow = {};
                            Object.keys(orderedRow).sort().forEach(function(key) {
                                orderedRow[key] = row[key];
                            });
                            if(JSON.stringify(orderedRow)===JSON.stringify(orderedSubCategory)){
                                category.rows.splice(index,1)
                            }
                        })
                    })

                }
            })
          })
      }

        showSubCategories(index){
          if(index===0){
            this.subCategoriesArray=[];
            this.subCategoriesData=[];
          }
          if(this.selectedCategory!=="Select Category" && index!==this.selectedCategory.subCategories.length){
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

      exitUpdate(){
          this.editFlag=false;
          this.selectedCategory="Select Category";
          this.subCategoriesArray=[];
          this.subCategoriesData=[];
      }

      updateSubCategory(){
        let temp={};
        let tempSubCategory;
        let rowIndex;
        this.selectedCategory.subCategories.forEach((category,index) => {
            temp[category]=this.subCategoriesArray[index]
        }); 
        
        let alreadyExist=false;
        this.selectedSubcategories.forEach(category=>{
            if(category.categoryName===this.selectedCategory.categoryName){
                tempSubCategory=category;
                category.rows.forEach((row,index)=>{

                    const orderedSubCategory = {};
                    Object.keys(row).sort().forEach(function(key) {
                        orderedSubCategory[key] = row[key];
                    });

                    
                        const orderedRow = {};
                        Object.keys(temp).sort().forEach(function(key) {
                            orderedRow[key] = temp[key].toString();
                        });
                        if(JSON.stringify(orderedRow)===JSON.stringify(orderedSubCategory)){
                            alreadyExist=true;
                        }
                     
                })

            }
        });
        if(alreadyExist){
            this.errorMessage="SubCategory already exist";
        }else{
            this.errorMessage="";
            this.selectedSubcategories[this.editCategoryIndex].rows[this.editSubcategoryIndex]=temp;
            this.editFlag=false;
            this.selectedCategory="Select Category";
            this.subCategoriesArray=[];
            this.subCategoriesData=[];
        }
       
      };

      editSubCategory(category,categoryIndex,subcategoryIndex){
          this.editFlag=true;
          this.editSubcategoryIndex=subcategoryIndex;
          this.editCategoryIndex=categoryIndex;
          this.categories.forEach(category1=>{
            if(category1.categoryName===category.categoryName){
                this.selectedCategory=category1;
            }
        });
        this.showSubCategories(0);
        category.subCategories.forEach((subCategory,i)=>{
            this.subCategoriesArray[i]=category.rows[subcategoryIndex][subCategory];
            this.showSubCategories(i+1);
        });
       
        
      };

      removeSubCategory(category,index){
       if(!this.editFlag){
        // let subCategoryRemoved=category.rows[index];
        // this.categories.forEach(category1=>{
        //     if(category1.categoryName===category.categoryName){
        //         category1.rows.push(subCategoryRemoved);
        //     }
        // });
        category.rows.splice(index,1);
        this.selectedCategory="Select Category";
        this.subCategoriesArray=[];
        this.subCategoriesData=[];
       }
      }

      addSubCategory(){
        
        if(this.editFlag){
            this.selectedSubcategories[this.editCategoryIndex].rows.splice(this.editSubcategoryIndex,1);
        }
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
            this.editFlag=false;
            this.selectedCategory="Select Category";
            this.subCategoriesArray=[];
            this.subCategoriesData=[];
          };
    
      buildSubCategories(tempSubCategory){
           
            var temp=[];
            this.subCategoriesArray.forEach((category,index) => {
                if(category==="All"){
                    temp[index]=this.subCategoriesData[index];
                }else{
                    temp[index]=[category];
                }
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

      
      isSubCategoryValid(){

        let isInvalid=true;
        if(this.selectedCategory!=="Select Category" && this.subCategoriesArray.length===this.selectedCategory.subCategories.length){
            let i=0;
            this.subCategoriesArray.forEach((subCategory,index) => {
                if(subCategory.toString().includes("Select")){
                  i++;
                }
             }); 
             if(i==0){
                isInvalid=false;
             }
        }
        return isInvalid;
      };

      submitProfile(){
      this.spinnerService.emitChange(true);
        this.disableFields=true;
        this.errorMessage="";
        this.successMessage="";
           if(this.isEmailAlert && this.isMobileAlert){
                this.profileModel.alertsOn=["Email","Mobile"];
            }else if(this.isEmailAlert){
                this.profileModel.alertsOn=["Email"];
            }else if(this.isMobileAlert){
                this.profileModel.alertsOn=["Mobile"];
            }
            this.profileService.submitProfile(this.profileModel).subscribe(response => {

            if(response.sessionExpired){
            this.spinnerService.emitChange(false);
              this.router.navigate(['home']);
            }else{
              this.successMessage="Profile updated";
              this.categories=JSON.parse(JSON.stringify(this.mainCategories));
              this.dashboardService.userDetails=this.profileModel;
              this.spinnerService.emitChange(false);
            }

            },err => {
                this.errorMessage="Something went wrong.Please contact administrator";
                this.spinnerService.emitChange(false);
            });
       }

 }
