System.register(["@angular/core", "@angular/forms", "../app/route.component", "ng2-component-spinner", "./home.component", "./spinner.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, forms_1, route_component_1, ng2_component_spinner_1, home_component_1, spinner_service_1, HomeModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (route_component_1_1) {
                route_component_1 = route_component_1_1;
            },
            function (ng2_component_spinner_1_1) {
                ng2_component_spinner_1 = ng2_component_spinner_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (spinner_service_1_1) {
                spinner_service_1 = spinner_service_1_1;
            }
        ],
        execute: function () {
            HomeModule = (function () {
                function HomeModule() {
                }
                return HomeModule;
            }());
            HomeModule = __decorate([
                core_1.NgModule({
                    imports: [
                        forms_1.FormsModule,
                        route_component_1.RouteComponent,
                        ng2_component_spinner_1.SpinnerComponentModule
                    ],
                    declarations: [
                        home_component_1.HomeComponent
                    ],
                    providers: [
                        spinner_service_1.SpinnerService
                    ]
                })
            ], HomeModule);
            exports_1("HomeModule", HomeModule);
        }
    };
});
