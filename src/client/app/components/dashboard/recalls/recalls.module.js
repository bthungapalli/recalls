System.register(["@angular/core", "@angular/common", "angular2-datatable", "@angular/forms", "@angular/http", "mydatepicker", "ng2-file-upload", "./recalls.component", "./recall.component", "./recalls.service", "./data.filter"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, angular2_datatable_1, forms_1, http_1, mydatepicker_1, ng2_file_upload_1, recalls_component_1, recall_component_1, recalls_service_1, data_filter_1, RecallsModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (angular2_datatable_1_1) {
                angular2_datatable_1 = angular2_datatable_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (mydatepicker_1_1) {
                mydatepicker_1 = mydatepicker_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            },
            function (recalls_component_1_1) {
                recalls_component_1 = recalls_component_1_1;
            },
            function (recall_component_1_1) {
                recall_component_1 = recall_component_1_1;
            },
            function (recalls_service_1_1) {
                recalls_service_1 = recalls_service_1_1;
            },
            function (data_filter_1_1) {
                data_filter_1 = data_filter_1_1;
            }
        ],
        execute: function () {
            RecallsModule = (function () {
                function RecallsModule() {
                }
                return RecallsModule;
            }());
            RecallsModule = __decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule,
                        angular2_datatable_1.DataTableModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        mydatepicker_1.MyDatePickerModule
                    ],
                    declarations: [
                        recalls_component_1.RecallsComponent,
                        recall_component_1.RecallComponent,
                        data_filter_1.DataFilterPipe,
                        ng2_file_upload_1.FileSelectDirective
                    ],
                    providers: [
                        recalls_service_1.RecallsService
                    ]
                })
            ], RecallsModule);
            exports_1("RecallsModule", RecallsModule);
        }
    };
});
