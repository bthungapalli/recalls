System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Vehicle;
    return {
        setters: [],
        execute: function () {
            Vehicle = (function () {
                function Vehicle() {
                    this.name = '';
                    this.model = '';
                    this.year = '';
                }
                return Vehicle;
            }());
            exports_1("Vehicle", Vehicle);
        }
    };
});
