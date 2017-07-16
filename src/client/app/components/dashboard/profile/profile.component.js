System.register(["@angular/core", "@angular/router", "./profile.model", "./profile.service", "../dashboard.service", "../spinner.service"], function (exports_1, context_1) {
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
    var core_1, router_1, profile_model_1, profile_service_1, dashboard_service_1, spinner_service_1, ProfileComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (profile_model_1_1) {
                profile_model_1 = profile_model_1_1;
            },
            function (profile_service_1_1) {
                profile_service_1 = profile_service_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            },
            function (spinner_service_1_1) {
                spinner_service_1 = spinner_service_1_1;
            }
        ],
        execute: function () {
            ProfileComponent = (function () {
                function ProfileComponent(profileService, dashboardService, router, spinnerService) {
                    var _this = this;
                    this.profileService = profileService;
                    this.dashboardService = dashboardService;
                    this.router = router;
                    this.spinnerService = spinnerService;
                    this.disableFields = true;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.profileModel = new profile_model_1.Profile();
                    this.spinnerService.emitChange(true);
                    this.profileService.getUser().subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.spinnerService.emitChange(false);
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.profileModel = Object.assign({}, response);
                            _this.isEmailAlert = _this.profileModel.alertsOn.includes("Email");
                            _this.isMobileAlert = _this.profileModel.alertsOn.includes("Mobile");
                            _this.dashboardService.emitChange(response);
                            _this.dashboardService.userDetails = response;
                            _this.spinnerService.emitChange(false);
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                        _this.spinnerService.emitChange(false);
                    });
                }
                ProfileComponent.prototype.submitProfile = function () {
                    var _this = this;
                    this.spinnerService.emitChange(true);
                    this.disableFields = true;
                    this.errorMessage = "";
                    this.successMessage = "";
                    if (this.isEmailAlert && this.isMobileAlert) {
                        this.profileModel.alertsOn = ["Email", "Mobile"];
                    }
                    else if (this.isEmailAlert) {
                        this.profileModel.alertsOn = ["Email"];
                    }
                    else if (this.isMobileAlert) {
                        this.profileModel.alertsOn = ["Mobile"];
                    }
                    this.profileService.submitProfile(this.profileModel).subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.spinnerService.emitChange(false);
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.successMessage = "Profile updated";
                            _this.dashboardService.userDetails = _this.profileModel;
                            _this.spinnerService.emitChange(false);
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                        _this.spinnerService.emitChange(false);
                    });
                };
                return ProfileComponent;
            }());
            ProfileComponent = __decorate([
                core_1.Component({
                    selector: 'profile',
                    templateUrl: "./app/components/dashboard/profile/profile.html"
                }),
                __metadata("design:paramtypes", [profile_service_1.ProfileService, dashboard_service_1.DashboardService, router_1.Router, spinner_service_1.SpinnerService])
            ], ProfileComponent);
            exports_1("ProfileComponent", ProfileComponent);
        }
    };
});
