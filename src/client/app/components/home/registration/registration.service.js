System.register(["@angular/core", "@angular/http", "rxjs/Rx"], function (exports_1, context_1) {
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
    var core_1, http_1, Rx_1, RegistrationService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }
        ],
        execute: function () {
            RegistrationService = (function () {
                function RegistrationService(http) {
                    this.http = http;
                    this.REGISTRATION_POST_URL = "/registration";
                    this.CHECK_EMAIL_POST_URL = "/registration/checkEmail";
                }
                RegistrationService.prototype.submitSignUp = function (registrationModel) {
                    return this.http.post(this.REGISTRATION_POST_URL, registrationModel)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                RegistrationService.prototype.checkEmail = function (registrationModel) {
                    return this.http.post(this.CHECK_EMAIL_POST_URL, registrationModel)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                return RegistrationService;
            }());
            RegistrationService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], RegistrationService);
            exports_1("RegistrationService", RegistrationService);
        }
    };
});
