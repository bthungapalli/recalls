System.register(["@angular/core", "@angular/http", "rxjs/Observable", "rxjs/Subject", "./profile/profile.model"], function (exports_1, context_1) {
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
    var core_1, http_1, Observable_1, Subject_1, profile_model_1, DashboardService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (profile_model_1_1) {
                profile_model_1 = profile_model_1_1;
            }
        ],
        execute: function () {
            DashboardService = (function () {
                function DashboardService(http) {
                    this.http = http;
                    this.LOGOUT_URL = "/logout";
                    this.emitChangeSource = new Subject_1.Subject();
                    this.changeEmitted$ = this.emitChangeSource.asObservable();
                    this.userDetails = new profile_model_1.Profile();
                }
                DashboardService.prototype.emitChange = function (change) {
                    this.emitChangeSource.next(change);
                };
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
                    this.userDetails.role = login.role;
                    this.userDetails.isActive = login.isActive;
                    this.userDetails.categories = login.categories;
                };
                DashboardService.prototype.logout = function () {
                    return this.http.get(this.LOGOUT_URL)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
                };
                return DashboardService;
            }());
            DashboardService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], DashboardService);
            exports_1("DashboardService", DashboardService);
        }
    };
});
