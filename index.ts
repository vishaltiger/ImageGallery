var Ser = new Service();
var Ut = new Utility();
var ImageGallery={
recentUrl:"",
flag:-1,
currentSelected:"",

CreateGalleryItems:function(imagelist:GalleryItemModal[]){
var gallery:HTMLElement |null = document.querySelector('.galleryPortion');

imagelist.forEach(ele=>{
if(document.getElementById(ele.id.toString())==null || document.getElementById(ele.id.toString())==undefined ){
  var imageDiv:HTMLElement = document.createElement('div'); 
  imageDiv.innerHTML="<div class='imageBox'><img  src='"+ele.recentUrl+"'></div><div class='content'> <p class='name'>"+ele.name+"</p><p class='date'>"+ele.date+"</p><p class='time'>"+ele.time+"</p><i id='"+ele.id+"' class='fa fa-pencil-square-o EditIcon' data-toggle='modal' data-target='#FormModal' onclick='ImageGallery.EditForm(event)' aria-hidden='true'></i><i id='"+ele.id+"' class='fa fa-trash' onclick='ImageGallery.deleteImage(event)' aria-hidden='true'></i></div>";
  gallery?.appendChild(imageDiv);
}

})
},
generateUniqueId:function():number{
var id = Math.floor(Math.random() * 1000000);
var list = Ser.gelist();
list.forEach(ele=>{
if(ele.id==id){
  id=Math.floor(Math.random() * 1000000);
}
})
return id;
},
DisplayItems:function() {

var imagelist = Ser.gelist();
ImageGallery.CreateGalleryItems(imagelist);
},
checkIfEmptyList:function() {
var gallery = document.querySelector(".galleryPortion");
var newEle = document.createElement('p');
var newImg = document.createElement('img');
newEle.setAttribute("class","MessageTitle");
console.log(Ser.gelist().length);
if(gallery!=null){
if(Ser.gelist().length==0){
  newImg.setAttribute("src","https://cdn.dribbble.com/users/707433/screenshots/6654057/comp_4.gif");
  newEle.appendChild(newImg);
  gallery.appendChild(newEle);
}else{
  document.querySelector(".MessageTitle")?.remove();
  ImageGallery.DisplayItems(); 
}
}
},
clearFormField:function() {
var enterDate = <HTMLInputElement>document.querySelector('.EnterDate');
var AuthorName=<HTMLInputElement>document.querySelector('.AuthorName');
var inputImage =  <HTMLInputElement>document.querySelector(".imageinput");
AuthorName.value="";
enterDate.value="";
inputImage.value="";
},
loadImage:function(event:any){
const reader:any = new FileReader();
reader.addEventListener('load',()=>{
ImageGallery.recentUrl = reader.result;
})
reader.readAsDataURL(event.target.files[0]);

},
getTime:function(){
var time:string;
var d = new Date();
var h = d.getHours();
var m = d.getMinutes();

  if(m.toString().length<2){
    time=h.toString()+":"+"0"+m.toString();
  }else{
  time=h.toString()+":"+m.toString();
  }
  return time;
},
SaveImage :function() {
var time:string;
  var gallery:HTMLElement |null = document.querySelector('.galleryPortion');
  var modal :HTMLElement | null= document.getElementById('FormModal');
  var enterDate = <HTMLInputElement>document.querySelector('.EnterDate');
  var AuthorName=<HTMLInputElement>document.querySelector('.AuthorName');
  var inputImage =  <HTMLInputElement>document.querySelector(".imageinput");
  var UniqueId = ImageGallery.generateUniqueId();
  time = ImageGallery.getTime();

  if(gallery!=null && AuthorName!=null && modal!=null && inputImage!=null ){
    if(Ut.validate(AuthorName.value,inputImage.value,enterDate.value)==true){
    Ser.AddImage(UniqueId,AuthorName.value,time,enterDate.value,ImageGallery.recentUrl,inputImage.value);
      ImageGallery.CreateGalleryItems(Ser.gelist());
      ImageGallery.clearFormField();
    document.getElementById("SubmitButton")?.setAttribute("data-dismiss","modal");
    document.querySelector(".MessageTitle")?.remove();
    }else{
      document.getElementById("SubmitButton")?.setAttribute("data-dismiss","");
      alert("all fields are mandatory");
    }

}

},
EditForm:function(event:any){
var Title = document.getElementById("exampleModalLabel");
var Button = document.getElementById("SubmitButton");
var enterDate = <HTMLInputElement>document.querySelector('.EnterDate');
  var AuthorName=<HTMLInputElement>document.querySelector('.AuthorName');
  var inputImage =  <HTMLInputElement>document.querySelector(".imageinput");
ImageGallery.flag=0;
ImageGallery.currentSelected  = event.target.id;
if(Title!=null && Button!=null){
Title.innerHTML= "Edit Item";
Button.innerHTML="Update";
}
var imagelist = Ser.gelist();
console.log(imagelist);
if(imagelist.length!=0){

  imagelist.forEach(ele=>{
if(parseInt(event.target.id)==ele.id){
AuthorName.value = ele.name;
enterDate.value = ele.date;

}
  })
}

},
AddForm:function() {
ImageGallery.clearFormField();
var Title = document.getElementById("exampleModalLabel");
var Button = document.getElementById("SubmitButton");
ImageGallery.flag=1;
if(Title!=null && Button!=null){
  Title.innerHTML= "Add Item";
  Button.innerHTML="Add";
  }

},
EditImage:function(id:string) {
var parent = <Element>document.getElementById(id)?.parentElement;
var imgTag= <Element>document.getElementById(id)?.parentElement?.parentElement?.firstChild?.firstChild;
var enterDate = <HTMLInputElement>document.querySelector('.EnterDate');
  var AuthorName=<HTMLInputElement>document.querySelector('.AuthorName');
  var inputImage =  <HTMLInputElement>document.querySelector(".imageinput");
    var time:string=ImageGallery.getTime();
    
    if(Ut.validate(AuthorName.value,inputImage.value,enterDate.value)==true){
    console.log(inputImage.value.length);
      Ser.EditImage(parseInt(id),AuthorName.value,time,enterDate.value,ImageGallery.recentUrl,inputImage.value);
      if(parent!=null){
      parent.children[0].innerHTML = AuthorName.value;
      parent.children[1].innerHTML = enterDate.value;
      parent.children[2].innerHTML = time;
      imgTag.setAttribute("src",ImageGallery.recentUrl);
      document.getElementById("SubmitButton")?.setAttribute("data-dismiss","modal");
      AuthorName.value="";
      enterDate.value="";
      inputImage.value="";
      }
      
    }else{
    document.getElementById("SubmitButton")?.setAttribute("data-dismiss","");
    alert("all fields are mandatory");
    }
  
},
ToggleAddEditForm:function() {
  if(ImageGallery.flag==0){
  ImageGallery.EditImage(ImageGallery.currentSelected);
}else if(ImageGallery.flag==1){
        ImageGallery.SaveImage();
}
},
deleteImage:function(event:any) {

var id= event.target.id;
var Parentelement=document.getElementById(id)?.parentElement?.parentElement;
  if(Ser.Delete(parseInt(id))){
    ImageGallery.checkIfEmptyList();
    if(Parentelement!=null){
      Parentelement.remove();
      alert("deleted");
    }
  }

},


};
ImageGallery.checkIfEmptyList();
document.querySelector(".imageinput")?.addEventListener("change",ImageGallery.loadImage);
document.getElementById("SubmitButton")?.addEventListener("click",ImageGallery.ToggleAddEditForm);
document.querySelector(".AddFormOpen")?.addEventListener("click",ImageGallery.AddForm);
