import locationModel from "../models/locations.models.js";
import cloudinary from "../utils/cloudinary.js";

export const AddLocation = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "locations", // Cloudinary folder name
    });

    const newLocation = new locationModel({
      name,
      imageUrl: result.secure_url, // Save Cloudinary URL
    });

    await newLocation.save();

    res.status(201).json({
      message: "Location Added Successfully",
      location: newLocation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const GetAllLocations = async (req, res) => {
  try {
    const locations = await locationModel.find({});
    if (locations.length === 0) {
      return res.status(404).json({ message: "No locations found" });
    }
    res.status(200).json({ locations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  } 
};

export const DeleteLocation = async (req, res) => {
  try {
    const { name } = req.params;
    if(!name){
      return res.status(400).json({ message: "Name is required" });
    }
    const location = await locationModel.findOne({name});
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }       
    await locationModel.deleteOne({ name });
    res.status(200).json({ message: "Location deleted successfully" });
  } 
    catch (error) {         
    console.log(error);                     
    res.status(500).json({ message: "Server Error" });                          
    }                               
};