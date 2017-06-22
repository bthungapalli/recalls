System.register(["@angular/core", "./registration.model", "./registration.service"], function (exports_1, context_1) {
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
    var core_1, registration_model_1, registration_service_1, RegistrationComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (registration_model_1_1) {
                registration_model_1 = registration_model_1_1;
            },
            function (registration_service_1_1) {
                registration_service_1 = registration_service_1_1;
            }
        ],
        execute: function () {
            RegistrationComponent = (function () {
                function RegistrationComponent(registrationService) {
                    this.registrationService = registrationService;
                    this.errorMessage = "";
                    this.registrationModel = new registration_model_1.Registration();
                }
                RegistrationComponent.prototype.submitSignUp = function () {
                    if (this.registrationModel.password === this.registrationModel.confirmPassword) {
                        this.registrationService.submitSignUp(this.registrationModel);
                    }
                    else {
                        this.errorMessage = "Password and ConfirmPassword dint match";
                    }
                };
                return RegistrationComponent;
            }());
            RegistrationComponent = __decorate([
                core_1.Component({
                    selector: 'registration',
                    templateUrl: "./app/components/home/registration/registration.html"
                }),
                __metadata("design:paramtypes", [registration_service_1.RegistrationService])
            ], RegistrationComponent);
            exports_1("RegistrationComponent", RegistrationComponent);
        }
    };
});
