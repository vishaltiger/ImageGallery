class Service{
    imagelist :any[]=[];
    Service(){
      console.log("service");  
    }
   AddImage(id:number,name:string,time:string,date:string,recentUrl:string,filename:string) {
 
   
        var obj = {
            "id":id,
            "name":name,
            "time":time,
            "date":date,
            "recentUrl":recentUrl,
            "fileName":filename
        }
        this.imagelist.push(obj);
        return this.imagelist;
    }
    EditImage(id:number,name:string,time:string,date:string,recentUrl:string,fileName:string){
   this.imagelist.forEach(ele=>{
       if(ele.id==id){
           ele.id=id;
           ele.name=name;
           ele.time=time;
           ele.date=date;
           ele.recentUrl = recentUrl;
           ele.fileName = fileName;
       }
   })
   return this.imagelist;
    }
    Delete(id:number){
     this.imagelist.forEach(ele=>{
       if(ele.id==id){
           var i = imagelist.indexOf(ele);
          this.imagelist.splice(i,1);
        
       }
   })
   return this.imagelist;
    }

}