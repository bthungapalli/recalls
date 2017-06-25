System.register(["@angular/core", "./recalls.service"], function (exports_1, context_1) {
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
    var core_1, recalls_service_1, RecallsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (recalls_service_1_1) {
                recalls_service_1 = recalls_service_1_1;
            }
        ],
        execute: function () {
            RecallsComponent = (function () {
                function RecallsComponent(recallsService) {
                    this.recallsService = recallsService;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.recalls = [];
                }
                RecallsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.recallsService.getAllRecalls().subscribe(function (response) {
                        _this.recalls = response;
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                    });
                };
                ;
                return RecallsComponent;
            }());
            RecallsComponent = __decorate([
                core_1.Component({
                    selector: 'recalls',
                    templateUrl: "./app/components/dashboard/recalls/recalls.html"
                }),
                __metadata("design:paramtypes", [recalls_service_1.RecallsService])
            ], RecallsComponent);
            exports_1("RecallsComponent", RecallsComponent);
        }
    };
});
