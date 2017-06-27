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
    var core_1, http_1, Rx_1, RecallsService;
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
            RecallsService = (function () {
                function RecallsService(http) {
                    this.http = http;
                    this.GET_ALL_RECALLS_URL = "/recalls/allRecalls";
                    this.GET_CREATE_RECALL_URL = "/recalls/createRecall";
                    this.GET_RECALLS_BY_FILTER_URL = "/recalls/filterRecalls";
                    this.DELETE_RECALL_URL = "/recalls/";
                }
                RecallsService.prototype.getAllRecalls = function () {
                    return this.http.get(this.GET_ALL_RECALLS_URL)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                RecallsService.prototype.submitRecall = function (recallModel) {
                    return this.http.post(this.GET_CREATE_RECALL_URL, recallModel)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                RecallsService.prototype.getRecallsForFilter = function (category, toDate, fromDate) {
                    var body = { "category": category, "toDate": toDate, "fromDate": fromDate };
                    return this.http.post(this.GET_RECALLS_BY_FILTER_URL, body)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                RecallsService.prototype.deleteRecall = function (id) {
                    return this.http.delete(this.DELETE_RECALL_URL + id)
                        .map(function (res) { return res.json(); })
                        .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
                };
                return RecallsService;
            }());
            RecallsService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], RecallsService);
            exports_1("RecallsService", RecallsService);
        }
    };
});
