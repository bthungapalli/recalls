System.register(["@angular/core", "./profile.model", "./profile.service", "../dashboard.service"], function (exports_1, context_1) {
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
    var core_1, profile_model_1, profile_service_1, dashboard_service_1, ProfileComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profile_model_1_1) {
                profile_model_1 = profile_model_1_1;
            },
            function (profile_service_1_1) {
                profile_service_1 = profile_service_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }
        ],
        execute: function () {
            ProfileComponent = (function () {
                function ProfileComponent(profileService, dashboardService) {
                    this.profileService = profileService;
                    this.dashboardService = dashboardService;
                    this.disableFields = true;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.profileModel = new profile_model_1.Profile();
                    this.profileModel = Object.assign({}, dashboardService.userDetails);
                }
                ProfileComponent.prototype.submitProfile = function () {
                    var _this = this;
                    this.disableFields = true;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.profileService.submitProfile(this.profileModel).subscribe(function (response) {
                        _this.successMessage = "Profile updated";
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                return ProfileComponent;
            }());
            ProfileComponent = __decorate([
                core_1.Component({
                    selector: 'profile',
                    templateUrl: "./app/components/dashboard/profile/profile.html"
                }),
                __metadata("design:paramtypes", [profile_service_1.ProfileService, dashboard_service_1.DashboardService])
            ], ProfileComponent);
            exports_1("ProfileComponent", ProfileComponent);
        }
    };
});
