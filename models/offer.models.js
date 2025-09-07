import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
     code:{
        type:String,
        required:true,
        unique:true     
      },
        discountPercentage:{    
        type:Number,                
        required:true 
        },
        title:{
        type:String,
        required:true   
        } ,
        discription:{
        type:String,
        required:true   
        } ,
        expiryDate:{
        type:Date,  
        required:true
        }       

},{timestamps:true});

const offerModel = mongoose.model('Offers',offerSchema);
export default offerModel;
    