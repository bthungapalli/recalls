System.register(["@angular/core", "@angular/router", "../registration/registration.model", "./forgotPassword.service"], function (exports_1, context_1) {
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
    var core_1, router_1, registration_model_1, forgotPassword_service_1, ForgotPasswordComponent;
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
            function (forgotPassword_service_1_1) {
                forgotPassword_service_1 = forgotPassword_service_1_1;
            }
        ],
        execute: function () {
            ForgotPasswordComponent = (function () {
                function ForgotPasswordComponent(forgotPasswordService, router) {
                    this.forgotPasswordService = forgotPasswordService;
                    this.router = router;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.forgotPasswordModel = new registration_model_1.Registration();
                }
                ForgotPasswordComponent.prototype.submitForgotPassword = function () {
                    var _this = this;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.forgotPasswordService.submitForgotPassword(this.forgotPasswordModel)
                        .subscribe(function (response) {
                        if (response == null) {
                            _this.errorMessage = "Email does not exist,Please Sign In";
                        }
                        else {
                            _this.successMessage = "Mail sent";
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                return ForgotPasswordComponent;
            }());
            ForgotPasswordComponent = __decorate([
                core_1.Component({
                    selector: 'forgotPassword',
                    templateUrl: "./app/components/home/forgotPassword/forgotPassword.html"
                }),
                __metadata("design:paramtypes", [forgotPassword_service_1.ForgotPasswordService, router_1.Router])
            ], ForgotPasswordComponent);
            exports_1("ForgotPasswordComponent", ForgotPasswordComponent);
        }
    };
});
