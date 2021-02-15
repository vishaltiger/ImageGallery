class Service{
   private imagelist :ItemModal[]=[];
    Service(){
      console.log("service");  
    }
    public gelist(){
     return this.imagelist;
    }
    public AddImage(id:number,name:string,time:string,date:string,recentUrl:string,filename:string):ItemModal {
 
   
        var obj :ItemModal=  {
            id:id,
            name:name,
            time:time,
            date:date,
            recentUrl:recentUrl,
            fileName:filename
        }
        this.imagelist.push(obj);
        return obj;
    }
    public EditImage(id:number,name:string,time:string,date:string,recentUrl:string,fileName:string){
     
     this.imagelist.forEach(ele=>{
       if(ele.id==id){
           ele.id=id;
           ele.name=name;
           ele.time=time;
           ele.date=date;
           ele.recentUrl = recentUrl;
           ele.fileName = fileName;
           return ele;
       }
      
      
   })
 
    }
    public Delete(id:number):boolean{
        this.imagelist.forEach(ele=>{
       if(ele.id==id){
           var i = this.imagelist.indexOf(ele);
          this.imagelist.splice(i,1);
        
       }
   })
   return true;
    }

}