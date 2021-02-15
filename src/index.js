"use strict";
var _a, _b, _c;
var Ser = new Service();
var Ut = new Utility();
var ImageGallery = {
    recentUrl: "",
    id: 0,
    flag: -1,
    currentSelected: "",
    checkIfEmptyList: function () {
        var _a;
        var gallery = document.querySelector(".galleryPortion");
        var newEle = document.createElement('p');
        var newImg = document.createElement('img');
        newEle.setAttribute("class", "MessageTitle");
        console.log(Ser.gelist().length);
        if (gallery != null) {
            if (Ser.gelist().length == 0) {
                newImg.setAttribute("src", "https://cdn.dribbble.com/users/707433/screenshots/6654057/comp_4.gif");
                newEle.appendChild(newImg);
                gallery.appendChild(newEle);
            }
            else {
                (_a = document.querySelector(".MessageTitle")) === null || _a === void 0 ? void 0 : _a.remove();
            }
        }
    },
    clearFormField: function () {
        var enterDate = document.querySelector('.EnterDate');
        var AuthorName = document.querySelector('.AuthorName');
        var inputImage = document.querySelector(".imageinput");
        AuthorName.value = "";
        enterDate.value = "";
        inputImage.value = "";
    },
    loadImage: function (event) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            ImageGallery.recentUrl = reader.result;
        });
        reader.readAsDataURL(event.target.files[0]);
    },
    getTime: function () {
        var time;
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        if (m.toString().length < 2) {
            time = h.toString() + ":" + "0" + m.toString();
        }
        else {
            time = h.toString() + ":" + m.toString();
        }
        return time;
    },
    SaveImage: function () {
        var _a, _b;
        var time;
        var gallery = document.querySelector('.galleryPortion');
        var imageDiv = document.createElement('div');
        var modal = document.getElementById('FormModal');
        var enterDate = document.querySelector('.EnterDate');
        var AuthorName = document.querySelector('.AuthorName');
        var inputImage = document.querySelector(".imageinput");
        time = ImageGallery.getTime();
        if (gallery != null && AuthorName != null && modal != null && inputImage != null) {
            if (Ut.validate(AuthorName.value, inputImage.value, enterDate.value) == true) {
                Ser.AddImage(ImageGallery.id, AuthorName.value, time, enterDate.value, ImageGallery.recentUrl, inputImage.value);
                imageDiv.innerHTML = "<div class='imageBox'><img  src='" + ImageGallery.recentUrl + "'></div><div class='content'> <p class='name'>" + AuthorName.value + "</p><p class='date'>" + enterDate.value.toString() + "</p><p class='time'>" + time + "</p><i id='" + ImageGallery.id + "' class='fa fa-pencil-square-o EditIcon' data-toggle='modal' data-target='#FormModal' onclick='ImageGallery.EditForm(event)' aria-hidden='true'></i><i id='" + ImageGallery.id + "' class='fa fa-trash' onclick='ImageGallery.deleteImage(event)' aria-hidden='true'></i></div>";
                ImageGallery.id = ImageGallery.id + 1;
                gallery === null || gallery === void 0 ? void 0 : gallery.appendChild(imageDiv);
                ImageGallery.clearFormField();
                (_a = document.getElementById("SubmitButton")) === null || _a === void 0 ? void 0 : _a.setAttribute("data-dismiss", "modal");
                ImageGallery.checkIfEmptyList();
            }
            else {
                (_b = document.getElementById("SubmitButton")) === null || _b === void 0 ? void 0 : _b.setAttribute("data-dismiss", "");
                alert("all fields are mandatory");
            }
        }
    },
    EditForm: function (event) {
        var Title = document.getElementById("exampleModalLabel");
        var Button = document.getElementById("SubmitButton");
        var enterDate = document.querySelector('.EnterDate');
        var AuthorName = document.querySelector('.AuthorName');
        var inputImage = document.querySelector(".imageinput");
        ImageGallery.flag = 0;
        ImageGallery.currentSelected = event.target.id;
        if (Title != null && Button != null) {
            Title.innerHTML = "Edit Item";
            Button.innerHTML = "Update";
        }
        var imagelist = Ser.gelist();
        console.log(imagelist);
        if (imagelist.length != 0) {
            imagelist.forEach(function (ele) {
                if (parseInt(event.target.id) == ele.id) {
                    AuthorName.value = ele.name;
                    enterDate.value = ele.date;
                }
            });
        }
    },
    AddForm: function () {
        ImageGallery.clearFormField();
        var Title = document.getElementById("exampleModalLabel");
        var Button = document.getElementById("SubmitButton");
        ImageGallery.flag = 1;
        if (Title != null && Button != null) {
            Title.innerHTML = "Add Item";
            Button.innerHTML = "Add";
        }
    },
    EditImage: function (id) {
        var _a, _b, _c, _d, _e, _f, _g;
        var parent = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.parentElement;
        var imgTag = (_e = (_d = (_c = (_b = document.getElementById(id)) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.firstChild) === null || _e === void 0 ? void 0 : _e.firstChild;
        var enterDate = document.querySelector('.EnterDate');
        var AuthorName = document.querySelector('.AuthorName');
        var inputImage = document.querySelector(".imageinput");
        var time = ImageGallery.getTime();
        if (Ut.validate(AuthorName.value, inputImage.value, enterDate.value) == true) {
            console.log(inputImage.value.length);
            Ser.EditImage(parseInt(id), AuthorName.value, time, enterDate.value, ImageGallery.recentUrl, inputImage.value);
            if (parent != null) {
                parent.children[0].innerHTML = AuthorName.value;
                parent.children[1].innerHTML = enterDate.value;
                parent.children[2].innerHTML = time;
                imgTag.setAttribute("src", ImageGallery.recentUrl);
                (_f = document.getElementById("SubmitButton")) === null || _f === void 0 ? void 0 : _f.setAttribute("data-dismiss", "modal");
                AuthorName.value = "";
                enterDate.value = "";
                inputImage.value = "";
            }
        }
        else {
            (_g = document.getElementById("SubmitButton")) === null || _g === void 0 ? void 0 : _g.setAttribute("data-dismiss", "");
            alert("all fields are mandatory");
        }
    },
    ToggleAddEditForm: function () {
        if (ImageGallery.flag == 0) {
            ImageGallery.EditImage(ImageGallery.currentSelected);
        }
        else if (ImageGallery.flag == 1) {
            ImageGallery.SaveImage();
        }
    },
    deleteImage: function (event) {
        var _a, _b;
        var id = event.target.id;
        var Parentelement = (_b = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        if (Ser.Delete(parseInt(id))) {
            ImageGallery.checkIfEmptyList();
            if (Parentelement != null) {
                Parentelement.remove();
                alert("deleted");
            }
        }
    },
};
ImageGallery.checkIfEmptyList();
(_a = document.querySelector(".imageinput")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", ImageGallery.loadImage);
(_b = document.getElementById("SubmitButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", ImageGallery.ToggleAddEditForm);
(_c = document.querySelector(".AddFormOpen")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", ImageGallery.AddForm);
