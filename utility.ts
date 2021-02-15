class Utility{
    public validate(name:string,imageInput:string,date:string):boolean{
  return name.length!=0 ? (imageInput.length!=0 ? (date.length!=0 ? true:false):false):false;  
    }
}