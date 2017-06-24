System.register(["@angular/core", "@angular/http", "rxjs/Rx"], function (exports_1, context_1) {
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
    var core_1, http_1, Rx_1, CategoriesService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }
        ],
        execute: function () {
            CategoriesService = (function () {
                function CategoriesService(http) {
                    this.http = http;
                    this.GET_ALL_CATEGORIES_URL = "/categories/allCategories";
                    this.GET_CREATE_CATEGORY_URL = "/categories/createCategory";
                    this.GET_DELETE_CATEGORY_URL = "/categories/deleteCategory";
                }
                CategoriesService.prototype.getAllCategories = function () {
                    return this.http.get(this.GET_ALL_CATEGORIES_URL)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                CategoriesService.prototype.createCategory = function (categoryModel) {
                    return this.http.post(this.GET_CREATE_CATEGORY_URL, categoryModel)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                CategoriesService.prototype.deleteCategory = function (categoryModel) {
                    return this.http.delete(this.GET_DELETE_CATEGORY_URL, categoryModel)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                return CategoriesService;
            }());
            CategoriesService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], CategoriesService);
            exports_1("CategoriesService", CategoriesService);
        }
    };
});
