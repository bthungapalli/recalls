System.register(["@angular/core", "@angular/router", "./recalls.service", "../categories/categories.service", "../dashboard.service"], function (exports_1, context_1) {
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
    var core_1, router_1, recalls_service_1, categories_service_1, dashboard_service_1, RecallsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (recalls_service_1_1) {
                recalls_service_1 = recalls_service_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }
        ],
        execute: function () {
            RecallsComponent = (function () {
                function RecallsComponent(recallsService, categoriesService, router, dashboardService) {
                    this.recallsService = recallsService;
                    this.categoriesService = categoriesService;
                    this.router = router;
                    this.dashboardService = dashboardService;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.recalls = [];
                    this.categories = [];
                    this.sortBy = "created_at";
                    this.sortOrder = "desc";
                    this.category = "All";
                    this.profile = dashboardService.userDetails;
                }
                RecallsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.recallsService.getAllRecalls().subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.recalls = response;
                            if (response.length === 0) {
                                _this.successMessage = "No Recalls available";
                            }
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                    this.categoriesService.getAllCategories().subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.categories = response;
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                ;
                RecallsComponent.prototype.getRecallsForFilter = function () {
                    var _this = this;
                    this.errorMessage = "";
                    this.successMessage = "";
                    if (this.fromDate.epoc < this.toDate.epoc) {
                        this.recallsService.getRecallsForFilter(this.category, this.toDate.formatted, this.fromDate.formatted).subscribe(function (response) {
                            if (response.sessionExpired) {
                                _this.router.navigate(['home']);
                            }
                            else {
                                _this.recalls = response;
                                if (response.length === 0) {
                                    _this.successMessage = "No Recalls available for given dates.";
                                }
                            }
                        }, function (err) {
                            _this.errorMessage = "Something went wrong.Please contact administrator";
                        });
                    }
                    else {
                        this.errorMessage = "To Date should be after From Date";
                    }
                };
                RecallsComponent.prototype.deleteRecall = function (id) {
                    var _this = this;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.recallsService.deleteRecall(id).subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.router.navigate(['home']);
                        }
                        else {
                            var temp = JSON.parse(JSON.stringify(_this.recalls));
                            temp.forEach(function (t, j) {
                                if (t._id == id) {
                                    temp.splice(j, 1);
                                }
                            });
                            _this.recalls = [];
                            _this.recalls = temp;
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                RecallsComponent.prototype.editRecall = function (id) {
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.router.navigate(['dashboard/recall', id]);
                };
                return RecallsComponent;
            }());
            RecallsComponent = __decorate([
                core_1.Component({
                    selector: 'recalls',
                    templateUrl: "./app/components/dashboard/recalls/recalls.html"
                }),
                __metadata("design:paramtypes", [recalls_service_1.RecallsService, categories_service_1.CategoriesService, router_1.Router, dashboard_service_1.DashboardService])
            ], RecallsComponent);
            exports_1("RecallsComponent", RecallsComponent);
        }
    };
});
