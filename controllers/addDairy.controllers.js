import ImagesModel from "../models/Images.models.js";
import cloudinary from "../utils/cloudinary.js";

export const AddImages = async (req, res) => {
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
      folder: "Images", // Cloudinary folder name
    });

    const newLocation = new ImagesModel({
      name,
      imageUrl: result.secure_url, // Save Cloudinary URL
    });

    await newLocation.save();

    res.status(201).json({
      message: "Images Added Successfully",
      location: newLocation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const GetAllImages = async (req, res) => {
  try {
    const locations = await ImagesModel.find({});
    if (locations.length === 0) {
      return res.status(404).json({ message: "No Images found" });
    }
    res.status(200).json({ locations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  } 
};

export const DeleteImages = async (req, res) => {
  try {
    const { name } = req.params;
    if(!name){
      return res.status(400).json({ message: "Name is required" });
    }
    const location = await ImagesModel.findOne({name});
    if (!location) {
      return res.status(404).json({ message: "Images not found" });
    }       
    await ImagesModel.deleteOne({ name });
    res.status(200).json({ message: "Images deleted successfully" });
  } 
    catch (error) {         
    console.log(error);                     
    res.status(500).json({ message: "Server Error" });                          
    }                               
};