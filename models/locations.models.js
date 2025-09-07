import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
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

const locationModel = mongoose.model('Locations',LocationSchema);   
export default locationModel;