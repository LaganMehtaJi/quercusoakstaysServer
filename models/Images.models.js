import mongoose from "mongoose";

const ImagesSchema = new mongoose.Schema({
   name:{   
    type:String,
    required:true,
    unique:true
   },
   imageUrl:{
    type:String,
    required:true
   } 
},{timestamps:true});  

const ImagesModel = mongoose.model('Images',ImagesSchema);   

export default ImagesModel ;
