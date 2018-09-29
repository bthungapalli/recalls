import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { TitleCasePipe } from '../../shared/data.filter';

import { Recall } from './recalls.model';
import { RecallsService } from './recalls.service';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/categories.model';
import { SpinnerService } from '../spinner.service';
import { Profile } from '../profile/profile.model';
import { DashboardService } from '../dashboard.service';
import { Vehicle } from './vehicle.model';

declare var tinymce: any;

@Component({
  selector: 'recall',
  templateUrl: "./app/components/dashboard/recalls/recall.html"
})
export class RecallComponent implements OnInit, OnDestroy {

  public errorMessage: string = "";
  public successMessage: string = "";
  public recallModel: Recall = new Recall();
  public categories: string[] = [];
  public description: any = "";
  public editor: any;
  public recallId: any;
  public recallCategory: any;
  public profile: Profile;
  public vehicle: Vehicle = new Vehicle();
  public fileUploadURL: string = (<any>window).origin + '/api/recalls/fileUpload';
  public uploader: FileUploader = new FileUploader({ url: this.fileUploadURL });

  public userTemplateUploadURL: string = (<any>window).origin + '/api/recalls/upload/userExcel';
  public userTemplateUploader: FileUploader = new FileUploader({ url: this.userTemplateUploadURL });

  public categoryUploadURL: string = (<any>window).origin + '/api/recalls/upload/userExcel';
  public categoryUploader: FileUploader = new FileUploader({ url: this.categoryUploadURL });

  public subCategoriesArray: any = [];
  public subCategoriesData: any = [];
  public selectedCategory: any = "Select Category";
  public selectedSubcategories: any = [];
  public category: any;
  public urlPath: string = '';
  public userTemplateError: string = "";
  public urlForBulkUpload: string = '';
  public categoryBulkError: any = [];

  public selectedImage: File;
  public foodData = {
    title: '',
    description: '',
    consumers_contact_person: '',
    consumers_contact_email: '',
    consumers_contact_phone: '',
    media_contact_person: '',
    media_contact_email: '',
    media_contact_phone: '',
    releaseText: ''
  };

  public drugsData = {
    company: '',
    brand: '',
    reason: ''
  }
  public brand = '';
  public company = '';

  constructor(private recallsService: RecallsService, private categoriesService: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService, private dashboardService: DashboardService) {
    this.recallModel = new Recall();
    this.profile = dashboardService.userDetails;
    this.categories = this.profile.categories;
  }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recallId = params["id"];
        this.recallCategory = params["categoryName"];
      }
    );
    this.urlForBulkUpload = window.location.origin + "/api/recalls/template/bulk/";
    this.urlPath = window.location.origin + "/api/recalls/template/userExcel";
    if (this.recallId) {
      this.spinnerService.emitChange(true);
      this.recallsService.getRecall(this.recallId, this.recallCategory).subscribe(response => {
        console.log("response", response);
        if (response.sessionExpired) {
          this.spinnerService.emitChange(false);
          this.router.navigate(['home']);
        } else if (this.recallCategory === 'Food' || this.recallCategory === 'Drugs') {
          this.foodData.title = response.title;
          this.foodData.description = response.description;
          this.foodData.releaseText = response.releaseText;
          this.foodData.consumers_contact_person = response.contact.consumers.person;
          this.foodData.consumers_contact_email = response.contact.consumers.email;
          this.foodData.consumers_contact_phone = response.contact.consumers.phone;
          if (response.contact.media) {
            if (response.contact.media.person) {
              this.foodData.media_contact_person = response.contact.media.person;
            }
            if (response.contact.media.email) {
              this.foodData.media_contact_email = response.contact.media.email;
            }
            if (response.contact.media.phone) {
              this.foodData.media_contact_phone = response.contact.media.phone;
            }
          }
          this.drugsData.brand = response.brand;
          this.drugsData.company = response.company;
          this.drugsData.reason = response.reason;
        } else {
          this.recallModel = response;
        }
        console.log("data", this.foodData, this.drugsData);
        if (response.categoryName) {
          var temp = response.categoryName.split("~");
          this.category = temp[0];
          for (var i = 1; i <= temp.length; i++) {
            this.subCategoriesArray.push(temp[i]);
          }
        }
        if (this.recallModel.categoryName === "Boats and Boating Safety") {
          this.recallModel.caseOpenDate = { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth() + 1, "day": new Date(response.recallDate).getDate() } };
          this.recallModel.caseCloseDate = { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth() + 1, "day": new Date(response.recallDate).getDate() } };
          this.recallModel.campaignOpenDate = { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth() + 1, "day": new Date(response.recallDate).getDate() } };
          this.recallModel.campaignCloseDate = { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth() + 1, "day": new Date(response.recallDate).getDate() } };
        } else if (this.recallModel.categoryName === "Consumer Products") {
          this.recallModel.recallDate = { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth() + 1, "day": new Date(response.recallDate).getDate() } };
        } else if (this.recallModel.categoryName === "Foods, Medicines, Cosmetics") {
          this.recallModel.immediateRelease = { "date": { "year": new Date(response.recallDate).getFullYear(), "month": new Date(response.recallDate).getMonth() + 1, "day": new Date(response.recallDate).getDate() } };
        }
        var callTinyMCE = this.callTinyMCE;
        var thisObject = this;
        setTimeout(function () {
          callTinyMCE(thisObject);
        }, 500);
        this.spinnerService.emitChange(false);
      }, err => {
        this.errorMessage = "Something went wrong.Please contact administrator";
        this.spinnerService.emitChange(false);
      });
    }

  };


  callTinyMCE(thisObject) {
    var selector = "#description"//+this.recallModel.categoryName;
    tinymce.init({
      selector: selector,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',

      setup: editor => {
        thisObject.editor = editor;

        editor.on('init', () => {
          if (thisObject.recallModel.description != undefined) {
            editor.setContent(thisObject.recallModel.description);
            thisObject.recallModel.description = editor.getContent();
          }
        });
        editor.on('keyup', () => {
          thisObject.recallModel.description = editor.getContent();
        });
      },
    });
  }

  submitRecall() {

    this.spinnerService.emitChange(true);

    if (this.recallModel.categoryName === "Boats and Boating Safety") {
      this.recallModel.caseOpenDate = (<any>this.recallModel.caseOpenDate).formatted;
      this.recallModel.caseCloseDate = (<any>this.recallModel.caseCloseDate).formatted;
      this.recallModel.campaignOpenDate = (<any>this.recallModel.campaignOpenDate).formatted;
      this.recallModel.campaignCloseDate = (<any>this.recallModel.campaignCloseDate).formatted;
    } else if (this.recallModel.categoryName === "Consumer Products") {
      this.recallModel.recallDate = (<any>this.recallModel.recallDate).formatted;
    } else if (this.recallModel.categoryName === "Foods, Medicines, Cosmetics") {
      this.recallModel.immediateRelease = (<any>this.recallModel.immediateRelease).formatted;
    }

    if (this.userTemplateUploader.queue.length > 0) {
      this.saveUserTemplate();
    } else {
      this.processRecall();
    }
  }


  saveUserTemplate() {
    var thisObject = this;
    thisObject.userTemplateError = "";
    this.userTemplateUploader.queue.forEach(function (item) {
      item.upload();
    });
    this.userTemplateUploader.onCompleteItem = (item, response, status, header) => {
      var responseJson = JSON.parse(response);
      var externalUsers = [];
      var rows = "";
      responseJson.data.forEach((obj, index) => {
        if (obj.name != undefined && obj.emailid != undefined && ((obj.name == "" && obj.emailid !== '') || (obj.name !== "" && obj.emailid == ''))) {
          var row = index + 2;
          rows = rows + row + ",";
        }
        if (obj.name != undefined && obj.emailid != undefined && obj.name !== "" && obj.emailid !== '') {
          externalUsers.push({
            "name": obj.name,
            "emailid": obj.emailid
          })
        }
      });
      if (externalUsers.length == 0 && rows == "") {
        thisObject.userTemplateError = "Template Corrupted,Please upload again";
        thisObject.spinnerService.emitChange(false);
      } else if (rows != "") {
        thisObject.userTemplateError = "Details missing ,Please Check " + rows + " row(s)";
        thisObject.spinnerService.emitChange(false);
      } else {
        thisObject.recallModel.externalUsers = externalUsers;
        thisObject.processRecall();
      }

    }
  };

  processRecall() {
    var thisObject = this;
    if ((this.recallModel.categoryName === "Tires" || this.recallModel.categoryName === "Child Safety Seats" || this.recallModel.categoryName === "Motor Vehicles") && this.uploader.queue.length > 0) {
      var files = [];
      var noOfFiles = this.uploader.queue.length;
      this.uploader.queue.forEach(function (item) {
        item.upload();
      });
      var successCalls = 0;
      this.uploader.onCompleteItem = (item, response, status, header) => {
        if (status === 200) {
          ++successCalls;
          files.push(JSON.parse(response).filename);
          if (successCalls == noOfFiles) {
            files.forEach(function (file) {
              thisObject.recallModel.files.push(file);
            });

            thisObject.createRecall(thisObject);


          }
        } else {
          thisObject.errorMessage = "Something went wrong.Please contact administrator";
          thisObject.spinnerService.emitChange(false);
        }
      }
    } else {
      thisObject.createRecall(thisObject);

    }
  }

  createRecall(thisObject) {
    if (!thisObject.recallId) {
      let temp = thisObject.selectedCategory.categoryName;
      thisObject.subCategoriesArray.forEach((data, index) => {
        temp = temp + "~" + data.toUpperCase();
      });
      thisObject.recallModel.categoryName = temp;
      thisObject.recallModel.subCategories = this.selectedCategory.subCategories;
    };
    thisObject.recallsService.submitRecall(thisObject.recallModel).subscribe(response => {
      thisObject.spinnerService.emitChange(false);
      if (response.sessionExpired) {
        thisObject.router.navigate(['home']);
      } else {
        if (!response.alreadyExist) {
          thisObject.dashboardService.userDetails.categories = response.categories;
        }
        thisObject.router.navigate(['dashboard/recalls']);
      }
    }, err => {
      thisObject.errorMessage = "Something went wrong.Please contact administrator";
      thisObject.spinnerService.emitChange(false);
    });
  };

  showSubCategories(index) {
    console.log("selectedCategory", this.selectedCategory);
    if (index === 0) {
      this.subCategoriesArray = [];
      this.subCategoriesData = [];
      this.changeCategory();
    }

    if (index !== this.selectedCategory.subCategories.length) {
      this.subCategoriesData[index] = [];
      let key = this.selectedCategory.subCategories[index];
      this.subCategoriesArray[index] = "Select " + key;
      this.selectedCategory.rows.forEach(row => {
        if (index > 0 && this.subCategoriesArray[index - 1] === row[this.selectedCategory.subCategories[index - 1]]) {
          this.subCategoriesData[index].push(row[key]);
        }
        if (index === 0) {
          if (this.subCategoriesData[index].indexOf(row[key]) === -1) {
            this.subCategoriesData[index].push(row[key]);
          }
        }
      });
    }

  };

  isSubCategoryValid() {
    let isInvalid = true;
    if (this.recallId) {
      isInvalid = false;
    } else {
      if (this.selectedCategory !== 'Select Cateogry' && this.selectedCategory.subCategories !== undefined && this.subCategoriesArray.length === this.selectedCategory.subCategories.length) {
        let i = 0;
        this.subCategoriesArray.forEach((subCategory, index) => {
          if (subCategory.includes("Select")) {
            i++;
          }
        });
        if (i == 0) {
          isInvalid = false;
        }
      }
    }

    return isInvalid;
  };

  changeCategory() {

    this.recallModel = new Recall();

    this.recallModel.categoryName = this.selectedCategory.categoryName;
    tinymce.remove(this.editor);
    var callTinyMCE = this.callTinyMCE;
    this.uploader = new FileUploader({ url: this.fileUploadURL });
    var thisObject = this;
    setTimeout(function () {
      callTinyMCE(thisObject);
    }, 500);

  }

  addVehicle() {
    this.recallModel.vehicles.push(this.vehicle);
    this.vehicle = new Vehicle();
  }


  deleteVehicle(vehicle) {
    var temp = JSON.parse(JSON.stringify(this.recallModel.vehicles));
    temp.forEach(function (vehicleTemp, index) {
      if (vehicleTemp.name.toUpperCase() === vehicle.name.toUpperCase() && vehicleTemp.model.toUpperCase() === vehicle.model.toUpperCase() && vehicleTemp.year.toUpperCase() === vehicle.year.toUpperCase()) {
        temp.splice(index, 1);
      }
    });
    this.recallModel.vehicles = [];
    this.recallModel.vehicles = temp;
  }


  deleteFile(index) {
    var temp = JSON.parse(JSON.stringify(this.recallModel.files));
    temp.splice(index, 1);
    this.recallModel.files = [];
    this.recallModel.files = temp;
  }


  bulkUpload() {
    this.spinnerService.emitChange(true);
    if (this.categoryUploader.queue.length > 0) {
      this.saveValues();
    } else {
      this.spinnerService.emitChange(false);
    }
  }

  saveValues() {
    var thisObject = this;
    thisObject.categoryBulkError = [];
    this.categoryUploader.queue.forEach(function (item) {
      item.upload();
    });
    this.categoryUploader.onCompleteItem = (item, response, status, header) => {
      var responseJson = JSON.parse(response);
      var recalls = [];

      if (this.recallModel.categoryName.includes('Motor Vehicles')) {
        responseJson.data.forEach((obj, index) => {
          var recall = new Recall();
          var recallErrors = {
            "row": index + 2,
            "errors": []
          };
          var subCategoriesArray = [];
          this.validateMotorVehicles(obj, recall, recallErrors.errors, subCategoriesArray);
          if (recallErrors.errors.length > 0) {
            thisObject.categoryBulkError.push(recallErrors);
          } else {

            let temp = thisObject.selectedCategory.categoryName;
            subCategoriesArray.forEach((data, index) => {
              temp = temp + "~" + data.toUpperCase();
            });
            recall.categoryName = temp;
            recall.subCategories = subCategoriesArray;
            recalls.push(recall);
          }

        });

        thisObject.recallsService.submitRecalls(recalls).subscribe(response => {
          thisObject.spinnerService.emitChange(false);
          this.categoryUploader = new FileUploader({ url: this.categoryUploadURL });
          if (response.sessionExpired) {
            thisObject.router.navigate(['home']);
          } else {
            if (!response.alreadyExist) {
              thisObject.dashboardService.userDetails.categories = response.categories;
            }
            if (thisObject.categoryBulkError.length == 0) {
              thisObject.router.navigate(['dashboard/recalls']);
            }

          }
        }, err => {
          thisObject.errorMessage = "Something went wrong.Please contact administrator";
          thisObject.spinnerService.emitChange(false);
        });


      } else {
        this.spinnerService.emitChange(false);
      }

    }
  }

  validateMotorVehicles(obj, recall, recallErrors, subCategoriesArray) {
    recall.vehicles[0] = {};
    obj.title == '' || obj.title == undefined ? recallErrors.push("Title cant be empty") : recall.title = obj.title;
    obj.description == '' || obj.description == undefined ? recallErrors.push("Description cant be empty") : recall.description = obj.description;
    obj.manufacturer == '' || obj.manufacturer == undefined ? recallErrors.push("Manufacturer cant be empty") : subCategoriesArray[0] = obj.manufacturer;
    obj.model == '' || obj.model == undefined ? recallErrors.push("Model cant be empty") : subCategoriesArray[1] = obj.model;
    obj.year == '' || obj.year == undefined ? recallErrors.push("Year cant be empty") : subCategoriesArray[2] = obj.year;
    obj["nhtsa campaign number"] == '' || obj["nhtsa campaign number"] == undefined ? recallErrors.push("NHTSA Campaign Number cant be empty") : recall.nHTSACampaignNumber = obj["nhtsa campaign number"];
    obj.components == '' || obj.components == undefined ? recallErrors.push("Components cant be empty") : recall.components = obj.components;
    obj.vin == '' || obj.vin == undefined ? recallErrors.push("VIN cant be empty") : recall.vin = obj.vin;
    obj["potential number of units affected"] == '' || obj["potential number of units affected"] == undefined ? recallErrors.push("Units cant be empty") : recall.units = obj["potential number of units affected"];
    obj.remedy == '' || obj.remedy == undefined ? recallErrors.push("Remedy cant be empty") : recall.remedy = obj.remedy;
    obj.summary == '' || obj.summary == undefined ? recallErrors.push("Summary cant be empty") : recall.summary = obj.summary;
    obj.notes == '' || obj.notes == undefined ? recallErrors.push("Notes cant be empty") : recall.notes = obj.notes;
    obj["affected products name"] == '' || obj["affected products name"] == undefined ? recallErrors.push("Affected Products Name cant be empty") : recall.vehicles[0].name = obj["affected products name"];
    obj["affected products model"] == '' || obj["affected products model"] == undefined ? recallErrors.push("Affected Products Model cant be empty") : recall.vehicles[0].model = obj["affected products model"];
    obj["affected products year"] == '' || obj["affected products year"] == undefined ? recallErrors.push("Affected Products Year cant be empty") : recall.vehicles[0].year = obj["affected products year"];

  }

  onImageChange(event) {
    console.log(event.target.files);
    this.selectedImage = event.target.files[0];
  }

  validateData(data) {
    var flag = true;
    var j = 0;
    for (var i in data) {
      if (i.indexOf('media') === -1 && !data[i]) {
        j++;
      }
    }
    // for (var i in fooddata) {
    //   if (i.indexOf('media') === -1 && !fooddata[i]) {
    //     j++;
    //   }
    // }
    // if (this.selectedCategory.categoryName === 'Drugs') {
    //   if (!drugsdata.company || !drugsdata.brand || !drugsdata.reason) {
    //     j++;
    //   }
    // }
    console.log("j", j);
    if (j > 0) {
      flag = false;
    }
    return flag;
  }

  saveDetails(data) {
    console.log("data", data);
  }

  saveRecallDetails(data) {

    this.errorMessage = "";
    this.successMessage = "";
    this.spinnerService.emitChange(true);

    console.log("fooddata", data);
    var formData = new FormData();
    // for (var key in fooddata) {
    //   formData.append(key, fooddata[key]);
    // }
    // for (var key in drugsdata) {
    //   formData.append(key, drugsdata[key]);
    // }
    for (var key in data) {
      formData.append(key, data[key]);
    }
    var flag = true;
    if (this.recallId) {
      formData.append('id', this.recallId);
      if (this.selectedImage && this.selectedImage.name) {
        formData.append('imageFile', this.selectedImage, this.selectedImage.name);
      }
    } else {
      if (this.selectedImage && this.selectedImage.name) {
        formData.append('imageFile', this.selectedImage, this.selectedImage.name);
      } else {
        flag = false;
      }
    }
    if (flag) {
      if (this.validateData(data)) {
        console.log('image', this.selectedImage);
        console.log('formdata', formData);
        this.recallsService.saveRecall(formData).subscribe(
          result => {
            console.log("result", result);
            if (result.sessionExpired) {
              this.errorMessage = "Something went wrong.Please contact administrator";
              this.spinnerService.emitChange(false);
            } else if (result.error_code === 0) {
              this.successMessage = "Data saved successfully";
              setTimeout(function () {
                this.successMessage = '';
              }, 5000);
            } else if (result.error_code === 1) {
              this.errorMessage = result.err_desc.errmsg;
            }
            this.spinnerService.emitChange(false);
          },
          err => {
            console.log("error", err);
            this.errorMessage = "Something went wrong.Please contact administrator";
            this.spinnerService.emitChange(false);
          });
      } else {
        this.errorMessage = "Enter all the required fields";
        this.spinnerService.emitChange(false);
      }

    } else {
      this.errorMessage = "Select image to upload";
      this.spinnerService.emitChange(false);
    }

  }

  ngOnDestroy() {
    tinymce.remove(this.editor);

  }
}
