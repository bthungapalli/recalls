System.register(["@angular/core", "@angular/common", "angular2-datatable", "@angular/http", "./categories.component", "./categories.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, angular2_datatable_1, http_1, categories_component_1, categories_service_1, CategoriesModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (angular2_datatable_1_1) {
                angular2_datatable_1 = angular2_datatable_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (categories_component_1_1) {
                categories_component_1 = categories_component_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            }
        ],
        execute: function () {
            CategoriesModule = (function () {
                function CategoriesModule() {
                }
                return CategoriesModule;
            }());
            CategoriesModule = __decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule,
                        angular2_datatable_1.DataTableModule,
                        http_1.HttpModule
                    ],
                    declarations: [
                        categories_component_1.CategoriesComponent
                    ],
                    providers: [
                        categories_service_1.CategoriesService
                    ]
                })
            ], CategoriesModule);
            exports_1("CategoriesModule", CategoriesModule);
        }
    };
});
