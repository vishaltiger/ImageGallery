var Ser = new Service();
var Ut = new Utility();
var imagelist :any[]=[];
var ImageGallery={
  recentUrl:"",
  id:0,
  flag:-1,
  currentSelected:"",
  checkIfEmptyList:function() {
    var gallery = document.querySelector(".galleryPortion");
    var newEle = document.createElement('p');
    var newImg = document.createElement('img');
    newEle.setAttribute("class","MessageTitle");
    if(gallery!=null){
      if(imagelist.length==0){
        newImg.setAttribute("src","https://cdn.dribbble.com/users/707433/screenshots/6654057/comp_4.gif");
        newEle.appendChild(newImg);
        gallery.appendChild(newEle);
      }else{
        document.querySelector(".MessageTitle")?.remove(); 
      }
    }
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
        var imageDiv:HTMLElement = document.createElement('div');
          var modal :HTMLElement | null= document.getElementById('FormModal');
        var enterDate = <HTMLInputElement>document.querySelector('.EnterDate');
        var AuthorName=<HTMLInputElement>document.querySelector('.AuthorName');
       var inputImage =  <HTMLInputElement>document.querySelector(".imageinput");
       time = ImageGallery.getTime();

        if(gallery!=null && AuthorName!=null && modal!=null && inputImage!=null ){
         
          if(Ut.validate(AuthorName.value,inputImage.value,enterDate.value)==true){
            imagelist= Ser.AddImage(ImageGallery.id,AuthorName.value,time,enterDate.value,ImageGallery.recentUrl,inputImage.value);
            imageDiv.innerHTML="<div class='imageBox'><img  src='"+ImageGallery.recentUrl+"'></div><div class='content'> <p class='name'>"+AuthorName.value+"</p><p class='date'>"+enterDate.value.toString()+"</p><p class='time'>"+time+"</p><i id='"+ImageGallery.id+"' class='fa fa-pencil-square-o EditIcon' data-toggle='modal' data-target='#FormModal' onclick='ImageGallery.EditForm(event)' aria-hidden='true'></i><i id='"+ImageGallery.id+"' class='fa fa-trash' onclick='ImageGallery.deleteImage(event)' aria-hidden='true'></i></div>";
          ImageGallery.id = ImageGallery.id+1;
        gallery?.appendChild(imageDiv);
        AuthorName.value="";
        enterDate.value="";
        inputImage.value="";
        document.getElementById("SubmitButton")?.setAttribute("data-dismiss","modal");
        ImageGallery.checkIfEmptyList();
        
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
           imagelist=Ser.EditImage(parseInt(id),AuthorName.value,time,enterDate.value,ImageGallery.recentUrl,inputImage.value);
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
        imagelist= Ser.Delete(parseInt(id));
      ImageGallery.checkIfEmptyList();
       if(Parentelement!=null){
        Parentelement.remove();
        alert("deleted");
       }
    },
    clearnodes:function(){
      console.log("hello");
      var Childele = document.querySelector(".galleryPortion");
      var items = Childele?.childNodes;
    console.log(items);
    
    }
  
};
ImageGallery.checkIfEmptyList();
document.querySelector(".imageinput")?.addEventListener("change",ImageGallery.loadImage);
document.getElementById("SubmitButton")?.addEventListener("click",ImageGallery.ToggleAddEditForm);
document.querySelector(".AddFormOpen")?.addEventListener("click",ImageGallery.AddForm);
