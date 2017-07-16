System.register(["@angular/core", "@angular/router", "./dashboard.service", "./spinner.service"], function (exports_1, context_1) {
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
    var core_1, router_1, dashboard_service_1, spinner_service_1, DashboardComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            },
            function (spinner_service_1_1) {
                spinner_service_1 = spinner_service_1_1;
            }
        ],
        execute: function () {
            DashboardComponent = (function () {
                function DashboardComponent(dashboardService, router, spinnerService) {
                    var _this = this;
                    this.dashboardService = dashboardService;
                    this.router = router;
                    this.spinnerService = spinnerService;
                    this.errorMessage = "";
                    this.expand = true;
                    this.profile = dashboardService.userDetails;
                    spinnerService.changeEmitted$.subscribe(function (text) {
                        _this.spinner = text;
                    });
                    dashboardService.changeEmitted$.subscribe(function (response) {
                        _this.profile = response;
                    });
                    if (this.profile.role !== "Admin") {
                        this.router.navigate(['dashboard/recalls']);
                    }
                }
                DashboardComponent.prototype.logout = function () {
                    var _this = this;
                    this.dashboardService.logout().subscribe(function (response) {
                        _this.router.navigate(['home']);
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                DashboardComponent.prototype.toggle = function () {
                    this.expand = !this.expand;
                };
                return DashboardComponent;
            }());
            DashboardComponent = __decorate([
                core_1.Component({
                    selector: 'dashboard',
                    templateUrl: "./app/components/dashboard/dashboard.html"
                }),
                __metadata("design:paramtypes", [dashboard_service_1.DashboardService, router_1.Router, spinner_service_1.SpinnerService])
            ], DashboardComponent);
            exports_1("DashboardComponent", DashboardComponent);
        }
    };
});
