import mongoose from "mongoose";
const addSchem = new mongoose.Schema({
    phone:{
        type:String,
        required:true
    }});

export const addModel = mongoose.model('Add',addSchem);
