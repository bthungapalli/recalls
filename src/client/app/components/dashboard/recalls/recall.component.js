System.register(["@angular/core", "@angular/router", "./recalls.model", "./recalls.service", "../categories/categories.service", "../spinner.service", "../dashboard.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, recalls_model_1, recalls_service_1, categories_service_1, spinner_service_1, dashboard_service_1, RecallComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (recalls_model_1_1) {
                recalls_model_1 = recalls_model_1_1;
            },
            function (recalls_service_1_1) {
                recalls_service_1 = recalls_service_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            },
            function (spinner_service_1_1) {
                spinner_service_1 = spinner_service_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }
        ],
        execute: function () {
            RecallComponent = (function () {
                function RecallComponent(recallsService, categoriesService, router, activatedRoute, spinnerService, dashboardService) {
                    this.recallsService = recallsService;
                    this.categoriesService = categoriesService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.spinnerService = spinnerService;
                    this.dashboardService = dashboardService;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.categories = [];
                    this.description = "";
                    this.recallModel = new recalls_model_1.Recall();
                    this.profile = dashboardService.userDetails;
                    this.categories = this.profile.categories;
                    this.thisObject = this;
                }
                RecallComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activatedRoute.params.subscribe(function (params) {
                        _this.recallId = params["id"];
                    });
                    if (this.recallId) {
                        this.spinnerService.emitChange(true);
                        this.recallsService.getRecall(this.recallId).subscribe(function (response) {
                            if (response.sessionExpired) {
                                _this.spinnerService.emitChange(false);
                                _this.router.navigate(['home']);
                            }
                            else {
                                _this.recallModel = response;
                            }
                            if (_this.recallModel.categoryName === "Boats and Boating Safety") {
                                _this.recallModel.caseOpenDate = { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth() + 1, day: new Date(response.recallDate).getDate() } };
                                _this.recallModel.caseCloseDate = { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth() + 1, day: new Date(response.recallDate).getDate() } };
                                _this.recallModel.campaignOpenDate = { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth() + 1, day: new Date(response.recallDate).getDate() } };
                                _this.recallModel.campaignCloseDate = { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth() + 1, day: new Date(response.recallDate).getDate() } };
                            }
                            else if (_this.recallModel.categoryName === "Consumer Products") {
                                _this.recallModel.recallDate = { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth() + 1, day: new Date(response.recallDate).getDate() } };
                            }
                            else if (_this.recallModel.categoryName === "Foods, Medicines, Cosmetics") {
                                _this.recallModel.immediateRelease = { date: { year: new Date(response.recallDate).getFullYear(), month: new Date(response.recallDate).getMonth() + 1, day: new Date(response.recallDate).getDate() } };
                            }
                            var callTinyMCE = _this.callTinyMCE;
                            var thisObject = _this.thisObject;
                            setTimeout(function () {
                                callTinyMCE(thisObject);
                            }, 500);
                            _this.spinnerService.emitChange(false);
                        }, function (err) {
                            _this.errorMessage = "Something went wrong.Please contact administrator";
                            _this.spinnerService.emitChange(false);
                        });
                    }
                    else {
                        this.recallModel.categoryName = this.categories[0];
                        var callTinyMCE = this.callTinyMCE;
                        var thisObject = this.thisObject;
                        setTimeout(function () {
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
                ;
                RecallComponent.prototype.callTinyMCE = function (thisObject) {
                    var selector = "#description"; //+this.recallModel.categoryName;
                    tinymce.init({
                        selector: selector,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table contextmenu paste code'
                        ],
                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                        setup: function (editor) {
                            thisObject.editor = editor;
                            editor.on('init', function () {
                                if (thisObject.recallModel.description != undefined) {
                                    editor.setContent(thisObject.recallModel.description);
                                    thisObject.recallModel.description = editor.getContent();
                                }
                            });
                            editor.on('keyup', function () {
                                thisObject.recallModel.description = editor.getContent();
                            });
                        },
                    });
                };
                RecallComponent.prototype.submitRecall = function () {
                    var _this = this;
                    this.spinnerService.emitChange(false);
                    if (this.recallModel.categoryName === "Boats and Boating Safety") {
                        this.recallModel.caseOpenDate = this.recallModel.caseOpenDate.formatted;
                        this.recallModel.caseCloseDate = this.recallModel.caseCloseDate.formatted;
                        this.recallModel.campaignOpenDate = this.recallModel.campaignOpenDate.formatted;
                        this.recallModel.campaignCloseDate = this.recallModel.campaignCloseDate.formatted;
                    }
                    else if (this.recallModel.categoryName === "Consumer Products") {
                        this.recallModel.recallDate = this.recallModel.recallDate.formatted;
                    }
                    else if (this.recallModel.categoryName === "Foods, Medicines, Cosmetics") {
                        this.recallModel.immediateRelease = this.recallModel.immediateRelease.formatted;
                    }
                    this.recallsService.submitRecall(this.recallModel).subscribe(function (response) {
                        _this.spinnerService.emitChange(false);
                        if (response.sessionExpired) {
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.router.navigate(['dashboard/recalls']);
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                        _this.spinnerService.emitChange(false);
                    });
                };
                RecallComponent.prototype.changeCategory = function () {
                    var categoryName = this.recallModel.categoryName;
                    this.recallModel = new recalls_model_1.Recall();
                    this.recallModel.categoryName = categoryName;
                    tinymce.remove(this.editor);
                    var callTinyMCE = this.callTinyMCE;
                    var thisObject = this.thisObject;
                    setTimeout(function () {
                        callTinyMCE(thisObject);
                    }, 500);
                };
                RecallComponent.prototype.ngOnDestroy = function () {
                    tinymce.remove(this.editor);
                };
                return RecallComponent;
            }());
            RecallComponent = __decorate([
                core_1.Component({
                    selector: 'recall',
                    templateUrl: "./app/components/dashboard/recalls/recall.html"
                }),
                __metadata("design:paramtypes", [recalls_service_1.RecallsService, categories_service_1.CategoriesService, router_1.Router, router_1.ActivatedRoute, spinner_service_1.SpinnerService, dashboard_service_1.DashboardService])
            ], RecallComponent);
            exports_1("RecallComponent", RecallComponent);
        }
    };
});
