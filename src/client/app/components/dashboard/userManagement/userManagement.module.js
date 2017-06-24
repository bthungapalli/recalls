System.register(["@angular/core", "@angular/common", "angular2-datatable", "@angular/http", "./userManagement.component", "./userManagement.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, angular2_datatable_1, http_1, userManagement_component_1, userManagement_service_1, UserManagementModule;
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
            function (userManagement_component_1_1) {
                userManagement_component_1 = userManagement_component_1_1;
            },
            function (userManagement_service_1_1) {
                userManagement_service_1 = userManagement_service_1_1;
            }
        ],
        execute: function () {
            UserManagementModule = (function () {
                function UserManagementModule() {
                }
                return UserManagementModule;
            }());
            UserManagementModule = __decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule,
                        angular2_datatable_1.DataTableModule,
                        http_1.HttpModule,
                    ],
                    declarations: [
                        userManagement_component_1.UserManagementComponent
                    ],
                    providers: [
                        userManagement_service_1.UserManagementService
                    ]
                })
            ], UserManagementModule);
            exports_1("UserManagementModule", UserManagementModule);
        }
    };
});
