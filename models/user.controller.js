import mongoose from "mongoose";
const {Schema} = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  
});
export const User = mongoose.model("User", userSchema);


const locationSchema = new Schema({ 
    name: { type: String, required: true },
    tagline: { type: String, required: true , },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Location = mongoose.model("Location", locationSchema);

const enquirySchema = new Schema({
    
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Enquiry = mongoose.model("Enquiry", enquirySchema);

const ListpropertySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    size: { type: String, required: true },
    location: { type: String, required: true },
    propertyname: { type: String, required: true },
    propertytype: { type: String, required: true ,
        enum : ['Apartment', 'House', 'Villa', 'Condo'],
        default: 'Apartment'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Listproperty = mongoose.model("Listproperty", ListpropertySchema);


