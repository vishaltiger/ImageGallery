"use strict";
var Service = /** @class */ (function () {
    function Service() {
        this.imagelist = [];
    }
    Service.prototype.Service = function () {
        console.log("service");
    };
    Service.prototype.gelist = function () {
        return this.imagelist;
    };
    Service.prototype.AddImage = function (id, name, time, date, recentUrl, filename) {
        var obj = {
            id: id,
            name: name,
            time: time,
            date: date,
            recentUrl: recentUrl,
            fileName: filename
        };
        this.imagelist.push(obj);
        return obj;
    };
    Service.prototype.EditImage = function (id, name, time, date, recentUrl, fileName) {
        this.imagelist.forEach(function (ele) {
            if (ele.id == id) {
                ele.id = id;
                ele.name = name;
                ele.time = time;
                ele.date = date;
                ele.recentUrl = recentUrl;
                ele.fileName = fileName;
                return ele;
            }
        });
    };
    Service.prototype.Delete = function (id) {
        var _this = this;
        this.imagelist.forEach(function (ele) {
            if (ele.id == id) {
                var i = _this.imagelist.indexOf(ele);
                _this.imagelist.splice(i, 1);
            }
        });
        return true;
    };
    return Service;
}());
