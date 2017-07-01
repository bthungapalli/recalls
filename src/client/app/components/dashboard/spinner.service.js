System.register(["@angular/core", "rxjs/Subject"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, Subject_1, SpinnerService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }
        ],
        execute: function () {
            SpinnerService = (function () {
                function SpinnerService() {
                    // Observable string sources
                    this.emitChangeSource = new Subject_1.Subject();
                    // Observable string streams
                    this.changeEmitted$ = this.emitChangeSource.asObservable();
                }
                // Service message commands
                SpinnerService.prototype.emitChange = function (change) {
                    this.emitChangeSource.next(change);
                };
                return SpinnerService;
            }());
            SpinnerService = __decorate([
                core_1.Injectable()
            ], SpinnerService);
            exports_1("SpinnerService", SpinnerService);
        }
    };
});