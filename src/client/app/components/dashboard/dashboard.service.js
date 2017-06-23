System.register(["@angular/core", "./profile/profile.model"], function (exports_1, context_1) {
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
    var core_1, profile_model_1, DashboardService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profile_model_1_1) {
                profile_model_1 = profile_model_1_1;
            }
        ],
        execute: function () {
            DashboardService = (function () {
                function DashboardService() {
                    this.userDetails = new profile_model_1.Profile();
                }
                DashboardService.prototype.setUserToProfile = function (login) {
                    this.userDetails._id = login._id;
                    this.userDetails.firstName = login.firstName;
                    this.userDetails.lastName = login.lastName;
                    this.userDetails.email = login.email;
                    this.userDetails.password = login.password;
                    this.userDetails.mobileNumber = login.mobileNumber;
                    this.userDetails.street = login.street;
                    this.userDetails.city = login.city;
                    this.userDetails.state = login.state;
                    this.userDetails.zipcode = login.zipcode;
                    this.userDetails.alertsOn = login.alertsOn;
                };
                return DashboardService;
            }());
            DashboardService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], DashboardService);
            exports_1("DashboardService", DashboardService);
        }
    };
});