System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, AppConstant, APP_CONSTANTS;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            exports_1("AppConstant", AppConstant = {
                REGISTRATION_URL: "/registration"
            });
            exports_1("APP_CONSTANTS", APP_CONSTANTS = new core_1.OpaqueToken('app.constant'));
        }
    };
});
