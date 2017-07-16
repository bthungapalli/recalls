System.register(["@angular/core", "@angular/router", "./categories.service", "../spinner.service"], function (exports_1, context_1) {
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
    var core_1, router_1, categories_service_1, spinner_service_1, RequestCategoryComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            },
            function (spinner_service_1_1) {
                spinner_service_1 = spinner_service_1_1;
            }
        ],
        execute: function () {
            RequestCategoryComponent = (function () {
                function RequestCategoryComponent(categoriesService, router, spinnerService) {
                    this.categoriesService = categoriesService;
                    this.router = router;
                    this.spinnerService = spinnerService;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.categoryName = "";
                }
                RequestCategoryComponent.prototype.submitRequest = function () {
                    var _this = this;
                    this.spinnerService.emitChange(true);
                    this.errorMessage = "";
                    this.categoriesService.requestCategory(this.categoryName).subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.spinnerService.emitChange(false);
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.categoryName = "";
                            _this.successMessage = "Request Sent";
                        }
                        _this.spinnerService.emitChange(false);
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                        _this.spinnerService.emitChange(false);
                    });
                };
                ;
                return RequestCategoryComponent;
            }());
            RequestCategoryComponent = __decorate([
                core_1.Component({
                    selector: 'requestCategory',
                    templateUrl: "./app/components/dashboard/categories/requestCategory.html"
                }),
                __metadata("design:paramtypes", [categories_service_1.CategoriesService, router_1.Router, spinner_service_1.SpinnerService])
            ], RequestCategoryComponent);
            exports_1("RequestCategoryComponent", RequestCategoryComponent);
        }
    };
});
