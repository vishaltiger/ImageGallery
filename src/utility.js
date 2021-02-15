"use strict";
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.prototype.validate = function (name, imageInput, date) {
        return name.length != 0 ? (imageInput.length != 0 ? (date.length != 0 ? true : false) : false) : false;
    };
    return Utility;
}());
