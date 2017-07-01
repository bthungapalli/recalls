System.register(["@angular/core", "@angular/router", "../home/home.component", "../home/login/login.component", "../home/registration/registration.component", "../home/forgotPassword/forgotPassword.component", "../dashboard/dashboard.component", "../dashboard/profile/profile.component", "../dashboard/userManagement/userManagement.component", "../dashboard/categories/categories.component", "../dashboard/recalls/recall.component", "../dashboard/recalls/recalls.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, home_component_1, login_component_1, registration_component_1, forgotPassword_component_1, dashboard_component_1, profile_component_1, userManagement_component_1, categories_component_1, recall_component_1, recalls_component_1, appRoutes, RouteComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (registration_component_1_1) {
                registration_component_1 = registration_component_1_1;
            },
            function (forgotPassword_component_1_1) {
                forgotPassword_component_1 = forgotPassword_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (userManagement_component_1_1) {
                userManagement_component_1 = userManagement_component_1_1;
            },
            function (categories_component_1_1) {
                categories_component_1 = categories_component_1_1;
            },
            function (recall_component_1_1) {
                recall_component_1 = recall_component_1_1;
            },
            function (recalls_component_1_1) {
                recalls_component_1 = recalls_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: home_component_1.HomeComponent,
                    children: [
                        { path: '', redirectTo: 'login', pathMatch: 'full' },
                        { path: 'login', component: login_component_1.LoginComponent },
                        { path: 'registration', component: registration_component_1.RegistrationComponent },
                        { path: 'forgotPassword', component: forgotPassword_component_1.ForgotPasswordComponent }
                    ] },
                { path: 'dashboard', component: dashboard_component_1.DashboardComponent,
                    children: [
                        { path: '', redirectTo: 'profile', pathMatch: 'full' },
                        { path: 'profile', component: profile_component_1.ProfileComponent },
                        { path: 'userManagement', component: userManagement_component_1.UserManagementComponent },
                        { path: 'categories', component: categories_component_1.CategoriesComponent },
                        { path: 'recall', component: recall_component_1.RecallComponent },
                        { path: 'recall/:id', component: recall_component_1.RecallComponent },
                        { path: 'recalls', component: recalls_component_1.RecallsComponent }
                    ]
                },
                { path: '**', redirectTo: 'dashboard' },
            ];
            RouteComponent = (function () {
                function RouteComponent() {
                }
                return RouteComponent;
            }());
            RouteComponent = __decorate([
                core_1.NgModule({
                    imports: [
                        router_1.RouterModule.forRoot(appRoutes)
                    ],
                    exports: [
                        router_1.RouterModule
                    ]
                })
            ], RouteComponent);
            exports_1("RouteComponent", RouteComponent);
        }
    };
});
