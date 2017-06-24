System.register(["@angular/core", "../profile/profile.model", "./userManagement.service"], function (exports_1, context_1) {
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
    var core_1, profile_model_1, userManagement_service_1, UserManagementComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profile_model_1_1) {
                profile_model_1 = profile_model_1_1;
            },
            function (userManagement_service_1_1) {
                userManagement_service_1 = userManagement_service_1_1;
            }
        ],
        execute: function () {
            UserManagementComponent = (function () {
                function UserManagementComponent(userManagementService) {
                    this.userManagementService = userManagementService;
                    this.errorMessage = "";
                    this.successMessage = "";
                }
                UserManagementComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userManagementService.getAllUsers().subscribe(function (response) {
                        _this.users = response;
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                ;
                UserManagementComponent.prototype.activateOrInactivateUser = function (user, value) {
                    var _this = this;
                    var tempUser = new profile_model_1.Profile();
                    tempUser = Object.assign({}, user);
                    tempUser.isActive = value;
                    this.userManagementService.activeOrInActivateUser(tempUser).subscribe(function (response) {
                        user.isActive = response.isActive;
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                ;
                return UserManagementComponent;
            }());
            UserManagementComponent = __decorate([
                core_1.Component({
                    selector: 'userManagement',
                    templateUrl: "./app/components/dashboard/userManagement/UserManagement.html"
                }),
                __metadata("design:paramtypes", [userManagement_service_1.UserManagementService])
            ], UserManagementComponent);
            exports_1("UserManagementComponent", UserManagementComponent);
        }
    };
});
