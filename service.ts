class Service{
Service(){
console.log("service");  
}
public gelist():GalleryItemModal[]{
var imagelist:GalleryItemModal[]=[];
if(sessionStorage.getItem("items")!=null){
if(JSON.parse(sessionStorage.getItem("items") || '').length!=0){
imagelist=   JSON.parse(sessionStorage.getItem("items") || '{}');
}

}

return imagelist;

}
public AddImage(id:number,name:string,time:string,date:string,recentUrl:string,fileName:string):GalleryItemModal {
var imagelist:GalleryItemModal[]=this.gelist();
var obj :GalleryItemModal=  {id,name,time,date,recentUrl,fileName};
imagelist.push(obj);
sessionStorage.setItem("items",JSON.stringify(imagelist));
return obj;
}
public EditImage(id:number,name:string,time:string,date:string,recentUrl:string,fileName:string):GalleryItemModal{
var imagelist:GalleryItemModal[]=this.gelist();
var obj:GalleryItemModal = {id,name,time,date,recentUrl,fileName};
imagelist = imagelist.filter(item=>{
    return item.id!=id;
})
imagelist.push(obj);
sessionStorage.setItem("items",JSON.stringify(imagelist));

return obj; 
}
public Delete(id:number):boolean{
var imagelist:GalleryItemModal[]=this.gelist();
imagelist = imagelist.filter(item=>{
    return item.id!=id;
})
sessionStorage.setItem("items",JSON.stringify(imagelist));
return true;
}

}