"use strict";
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.Service = function () {
        console.log("service");
    };
    Service.prototype.gelist = function () {
        var imagelist = [];
        if (sessionStorage.getItem("items") != null) {
            if (JSON.parse(sessionStorage.getItem("items") || '').length != 0) {
                imagelist = JSON.parse(sessionStorage.getItem("items") || '{}');
            }
        }
        return imagelist;
    };
    Service.prototype.AddImage = function (id, name, time, date, recentUrl, fileName) {
        var imagelist = this.gelist();
        var obj = { id: id, name: name, time: time, date: date, recentUrl: recentUrl, fileName: fileName };
        imagelist.push(obj);
        sessionStorage.setItem("items", JSON.stringify(imagelist));
        return obj;
    };
    Service.prototype.EditImage = function (id, name, time, date, recentUrl, fileName) {
        var imagelist = this.gelist();
        var obj = { id: id, name: name, time: time, date: date, recentUrl: recentUrl, fileName: fileName };
        imagelist = imagelist.filter(function (item) {
            return item.id != id;
        });
        imagelist.push(obj);
        sessionStorage.setItem("items", JSON.stringify(imagelist));
        return obj;
    };
    Service.prototype.Delete = function (id) {
        var imagelist = this.gelist();
        imagelist = imagelist.filter(function (item) {
            return item.id != id;
        });
        sessionStorage.setItem("items", JSON.stringify(imagelist));
        return true;
    };
    return Service;
}());
