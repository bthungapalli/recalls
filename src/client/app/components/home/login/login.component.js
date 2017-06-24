System.register(["@angular/core", "@angular/router", "../registration/registration.model", "./login.service", "../../dashboard/dashboard.service"], function (exports_1, context_1) {
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
    var core_1, router_1, registration_model_1, login_service_1, dashboard_service_1, LoginComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (registration_model_1_1) {
                registration_model_1 = registration_model_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }
        ],
        execute: function () {
            LoginComponent = (function () {
                function LoginComponent(loginService, router, dashboardService) {
                    this.loginService = loginService;
                    this.router = router;
                    this.dashboardService = dashboardService;
                    this.errorMessage = "";
                    this.loginModel = new registration_model_1.Registration();
                }
                LoginComponent.prototype.submitLogin = function () {
                    var _this = this;
                    this.errorMessage = "";
                    this.loginService.submitLogin(this.loginModel)
                        .subscribe(function (response) {
                        if (response == null) {
                            _this.errorMessage = "Email or Password is incorrect";
                        }
                        else {
                            if (!response.isActive) {
                                _this.errorMessage = "Your account is inactive.Please contact administrator";
                            }
                            else {
                                _this.dashboardService.setUserToProfile(response);
                                _this.router.navigate(['dashboard/profile']);
                            }
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                return LoginComponent;
            }());
            LoginComponent = __decorate([
                core_1.Component({
                    selector: 'login',
                    templateUrl: "./app/components/home/login/login.html"
                }),
                __metadata("design:paramtypes", [login_service_1.LoginService, router_1.Router, dashboard_service_1.DashboardService])
            ], LoginComponent);
            exports_1("LoginComponent", LoginComponent);
        }
    };
});
