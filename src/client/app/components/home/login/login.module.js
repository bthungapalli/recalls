System.register(["@angular/core", "@angular/forms", "@angular/http", "@angular/common", "../../app/route.component", "./login.component", "./login.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, forms_1, http_1, common_1, route_component_1, login_component_1, login_service_1, LoginModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (route_component_1_1) {
                route_component_1 = route_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }
        ],
        execute: function () {
            LoginModule = (function () {
                function LoginModule() {
                }
                return LoginModule;
            }());
            LoginModule = __decorate([
                core_1.NgModule({
                    imports: [
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        common_1.CommonModule,
                        route_component_1.RouteComponent
                    ],
                    declarations: [
                        login_component_1.LoginComponent
                    ],
                    providers: [
                        login_service_1.LoginService
                    ]
                })
            ], LoginModule);
            exports_1("LoginModule", LoginModule);
        }
    };
});
