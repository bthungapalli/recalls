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
    var core_1, http_1, Rx_1, ProfileService;
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
            ProfileService = (function () {
                function ProfileService(http) {
                    this.http = http;
                    this.PROFILE_UPDATE_URL = "/profile";
                }
                ProfileService.prototype.submitProfile = function (profileModel) {
                    return this.http.put(this.PROFILE_UPDATE_URL, profileModel)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                return ProfileService;
            }());
            ProfileService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], ProfileService);
            exports_1("ProfileService", ProfileService);
        }
    };
});
