System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "./route.component", "./app.component", "../home/home.module", "../dashboard/dashboard.module", "../home/login/login.module", "../dashboard/profile/profile.module", "../home/registration/registration.module", "../home/forgotPassword/forgotPassword.module", "../dashboard/userManagement/userManagement.module", "../dashboard/categories/categories.module", "../dashboard/recalls/recalls.module"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, forms_1, route_component_1, app_component_1, home_module_1, dashboard_module_1, login_module_1, profile_module_1, registration_module_1, forgotPassword_module_1, userManagement_module_1, categories_module_1, recalls_module_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (route_component_1_1) {
                route_component_1 = route_component_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (home_module_1_1) {
                home_module_1 = home_module_1_1;
            },
            function (dashboard_module_1_1) {
                dashboard_module_1 = dashboard_module_1_1;
            },
            function (login_module_1_1) {
                login_module_1 = login_module_1_1;
            },
            function (profile_module_1_1) {
                profile_module_1 = profile_module_1_1;
            },
            function (registration_module_1_1) {
                registration_module_1 = registration_module_1_1;
            },
            function (forgotPassword_module_1_1) {
                forgotPassword_module_1 = forgotPassword_module_1_1;
            },
            function (userManagement_module_1_1) {
                userManagement_module_1 = userManagement_module_1_1;
            },
            function (categories_module_1_1) {
                categories_module_1 = categories_module_1_1;
            },
            function (recalls_module_1_1) {
                recalls_module_1 = recalls_module_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        route_component_1.RouteComponent,
                        home_module_1.HomeModule,
                        dashboard_module_1.DashboardModule,
                        login_module_1.LoginModule,
                        registration_module_1.RegistrationModule,
                        profile_module_1.ProfileModule,
                        forgotPassword_module_1.ForgotPasswordModule,
                        userManagement_module_1.UserManagementModule,
                        categories_module_1.CategoriesModule,
                        recalls_module_1.RecallsModule
                    ],
                    declarations: [
                        app_component_1.AppComponent
                    ],
                    bootstrap: [app_component_1.AppComponent]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
