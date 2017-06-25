System.register(["@angular/core", "@angular/router", "./categories.model", "./categories.service"], function (exports_1, context_1) {
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
    var core_1, router_1, categories_model_1, categories_service_1, CategoriesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (categories_model_1_1) {
                categories_model_1 = categories_model_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            }
        ],
        execute: function () {
            CategoriesComponent = (function () {
                function CategoriesComponent(categoriesService, router) {
                    this.categoriesService = categoriesService;
                    this.router = router;
                    this.categories = [];
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.categoryModel = new categories_model_1.Category();
                }
                CategoriesComponent.prototype.ngOnInit = function () {
                    var _this = this;
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
                CategoriesComponent.prototype.submitCategory = function () {
                    var _this = this;
                    this.errorMessage = "";
                    var isCategoryAlreadyExist = false;
                    var categoryModel = this.categoryModel;
                    this.categories.forEach(function (category) {
                        if (category.categoryName.toUpperCase() === categoryModel.categoryName.toUpperCase()) {
                            isCategoryAlreadyExist = true;
                        }
                    });
                    if (isCategoryAlreadyExist) {
                        this.errorMessage = "Category already exist";
                    }
                    else {
                        this.categoriesService.createCategory(this.categoryModel).subscribe(function (response) {
                            if (response.sessionExpired) {
                                _this.router.navigate(['home']);
                            }
                            else {
                                _this.categories.push(response);
                                _this.categoryModel = new categories_model_1.Category();
                            }
                        }, function (err) {
                            _this.errorMessage = "Something went wrong.Please contact administrator";
                        });
                    }
                };
                ;
                CategoriesComponent.prototype.deleteCategory = function (category, index) {
                    var _this = this;
                    this.categoriesService.deleteCategory(category).subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.categories.splice(index, 1);
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                ;
                return CategoriesComponent;
            }());
            CategoriesComponent = __decorate([
                core_1.Component({
                    selector: 'categories',
                    templateUrl: "./app/components/dashboard/categories/categories.html"
                }),
                __metadata("design:paramtypes", [categories_service_1.CategoriesService, router_1.Router])
            ], CategoriesComponent);
            exports_1("CategoriesComponent", CategoriesComponent);
        }
    };
});
