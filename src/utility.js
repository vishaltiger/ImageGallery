"use strict";
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.prototype.validate = function (name, imageInput, date) {
        if (name.length != 0 && imageInput.length != 0 && date.length != 0) {
            return true;
        }
        else {
            false;
        }
    };
    return Utility;
}());
