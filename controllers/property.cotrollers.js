import { Property } from "../models/property.models.js";
import cloudinary from "../utils/cloudinary.js";

// ➕ Add Property
export const AddProperty = async (req, res) => {

  console.log("Request Body:", req.body);
  try {
    const {
      title,
      description,
      propertyType,
      location,
      address,
      price,
      spaceDetails,
      amenities,
      badges,
      specialFeatures,
    } = req.body;

    if (!title || !description || !propertyType || !location || !address || !price) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Upload images to cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "properties" })
      )
    );

    const images = imageUploads.map((img) => ({
      id: img.public_id,
      url: img.secure_url,
      alt: title,
    }));

    const newProperty = new Property({
      title,
      description,
      propertyType,
      location,
      address,
      price,
      spaceDetails: spaceDetails ? JSON.parse(spaceDetails) : {},
      amenities: amenities ? JSON.parse(amenities) : [],
      badges: badges ? JSON.parse(badges) : [],
      specialFeatures,
      images,
    });

    await newProperty.save();

    res.status(201).json({
      message: "Property added successfully ✅",
      property: newProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📂 Get All Properties
export const GetAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }
    res.status(200).json({ properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔍 Get Single Property by ID
export const GetPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ property });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✏️ Update Property
export const UpdateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // handle new image uploads
    let updatedImages;
    if (req.files && req.files.length > 0) {
      const property = await Property.findById(id);
      if (property) {
        // delete old images from cloudinary
        for (let img of property.images) {
          await cloudinary.uploader.destroy(img.id);
        }
      }

      const imageUploads = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: "properties" })
        )
      );
      updatedImages = imageUploads.map((img) => ({
        id: img.public_id,
        url: img.secure_url,
        alt: req.body.title || (property && property.title),
      }));
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        ...req.body,
        spaceDetails: req.body.spaceDetails ? JSON.parse(req.body.spaceDetails) : undefined,
        amenities: req.body.amenities ? JSON.parse(req.body.amenities) : undefined,
        badges: req.body.badges ? JSON.parse(req.body.badges) : undefined,
        ...(updatedImages && { images: updatedImages }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property updated successfully ✅",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ❌ Delete Property
export const DeleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // delete images from cloudinary
    for (let img of property.images) {
      await cloudinary.uploader.destroy(img.id);
    }

    await Property.findByIdAndDelete(id);

    res.status(200).json({ message: "Property deleted successfully ✅" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
