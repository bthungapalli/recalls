System.register(["@angular/core", "@angular/common", "@angular/forms", "@angular/http", "./registration.component", "./registration.service", "../../dashboard/categories/categories.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, http_1, registration_component_1, registration_service_1, categories_service_1, RegistrationModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (registration_component_1_1) {
                registration_component_1 = registration_component_1_1;
            },
            function (registration_service_1_1) {
                registration_service_1 = registration_service_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            }
        ],
        execute: function () {
            RegistrationModule = (function () {
                function RegistrationModule() {
                }
                return RegistrationModule;
            }());
            RegistrationModule = __decorate([
                core_1.NgModule({
                    imports: [
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        common_1.CommonModule
                    ],
                    declarations: [
                        registration_component_1.RegistrationComponent
                    ],
                    providers: [
                        registration_service_1.RegistrationService, categories_service_1.CategoriesService
                    ]
                })
            ], RegistrationModule);
            exports_1("RegistrationModule", RegistrationModule);
        }
    };
});
