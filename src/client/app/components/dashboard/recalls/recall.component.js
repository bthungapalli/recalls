System.register(["@angular/core", "@angular/router", "./recalls.model", "./recalls.service", "../categories/categories.service", "../spinner.service"], function (exports_1, context_1) {
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
    var core_1, router_1, recalls_model_1, recalls_service_1, categories_service_1, spinner_service_1, RecallComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (recalls_model_1_1) {
                recalls_model_1 = recalls_model_1_1;
            },
            function (recalls_service_1_1) {
                recalls_service_1 = recalls_service_1_1;
            },
            function (categories_service_1_1) {
                categories_service_1 = categories_service_1_1;
            },
            function (spinner_service_1_1) {
                spinner_service_1 = spinner_service_1_1;
            }
        ],
        execute: function () {
            RecallComponent = (function () {
                function RecallComponent(recallsService, categoriesService, router, activatedRoute, spinnerService) {
                    this.recallsService = recallsService;
                    this.categoriesService = categoriesService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.spinnerService = spinnerService;
                    this.errorMessage = "";
                    this.successMessage = "";
                    this.categories = [];
                    this.description = "";
                    this.recallModel = new recalls_model_1.Recall();
                    this.recallModel.categoryName = "Select Category";
                }
                RecallComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activatedRoute.params.subscribe(function (params) {
                        _this.recallId = params["id"];
                    });
                    if (this.recallId) {
                        this.spinnerService.emitChange(true);
                        this.recallsService.getRecall(this.recallId).subscribe(function (response) {
                            if (response.sessionExpired) {
                                _this.spinnerService.emitChange(false);
                                _this.router.navigate(['home']);
                            }
                            else {
                                _this.recallModel = response;
                            }
                            _this.callTinyMCE();
                            _this.spinnerService.emitChange(false);
                        }, function (err) {
                            _this.errorMessage = "Something went wrong.Please contact administrator";
                            _this.spinnerService.emitChange(false);
                        });
                    }
                    else {
                        this.callTinyMCE();
                    }
                    this.spinnerService.emitChange(true);
                    this.categoriesService.getAllCategories().subscribe(function (response) {
                        if (response.sessionExpired) {
                            _this.spinnerService.emitChange(false);
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.categories = response;
                        }
                        _this.spinnerService.emitChange(false);
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                        _this.spinnerService.emitChange(false);
                    });
                };
                ;
                RecallComponent.prototype.callTinyMCE = function () {
                    var _this = this;
                    tinymce.init({
                        selector: '#description',
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table contextmenu paste code'
                        ],
                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                        setup: function (editor) {
                            _this.editor = editor;
                            editor.on('init', function () {
                                if (_this.recallModel.description != undefined) {
                                    editor.setContent(_this.recallModel.description);
                                    _this.description = editor.getContent();
                                }
                            });
                            editor.on('keyup', function () {
                                _this.description = editor.getContent();
                            });
                        },
                    });
                };
                RecallComponent.prototype.submitRecall = function () {
                    var _this = this;
                    this.spinnerService.emitChange(false);
                    this.recallModel.description = this.description;
                    this.recallsService.submitRecall(this.recallModel).subscribe(function (response) {
                        _this.spinnerService.emitChange(false);
                        if (response.sessionExpired) {
                            _this.router.navigate(['home']);
                        }
                        else {
                            _this.router.navigate(['dashboard/recalls']);
                        }
                    }, function (err) {
                        _this.errorMessage = "Something went wrong.Please contact administrator";
                        _this.spinnerService.emitChange(false);
                    });
                };
                RecallComponent.prototype.ngOnDestroy = function () {
                    tinymce.remove(this.editor);
                };
                return RecallComponent;
            }());
            RecallComponent = __decorate([
                core_1.Component({
                    selector: 'recall',
                    templateUrl: "./app/components/dashboard/recalls/recall.html"
                }),
                __metadata("design:paramtypes", [recalls_service_1.RecallsService, categories_service_1.CategoriesService, router_1.Router, router_1.ActivatedRoute, spinner_service_1.SpinnerService])
            ], RecallComponent);
            exports_1("RecallComponent", RecallComponent);
        }
    };
});
