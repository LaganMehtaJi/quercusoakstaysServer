import express from "express";
import * as enquerymodel from "../models/user.controller.js";

export const addProperty = async (req, res) => {
  try {
    const { name, email , phone ,size , propertyname, location, propertytype } = req.body;
    if (!name || !email || !phone || !size || !propertyname || !location || !propertytype) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newProperty = await enquerymodel.Listproperty.create({
      name: name,
      email: email,
      phone: phone,
      size: size,
      propertyname: propertyname,
      location: location,
      propertytype: propertytype
    });
    res.status(201).json({ "message": "Success", "response": newProperty });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProperty = async (req, res) => {   
    try {
        const properties = await enquerymodel.Listproperty.find({});
        res.status(200).json({ "message": "Success", "response": properties });
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    };

export const deleteProperty = async (req, res) => { 
    try {
        const { email ,name ,propertyname} = req.body;
        if (!email || !name || !propertyname) {
        return res.status(400).json({ error: "Property name is required" });
        }
        const property = await enquerymodel.Listproperty.findOne({ email: email, name: name, propertyname: propertyname });
        if (!property) {    
        return res.status(404).json({ error: "Property not found" });
        }
        if (property.email !== email) {
        return res.status(403).json({ error: "You are not authorized to delete thisproperty" });
        }   
        const deletedProperty = await enquerymodel.Listproperty.deleteOne( {email:email});
        if (!deletedProperty) {
        return res.status(404).json({ error: "Property not found" });
        }
        res.status(200).json({ "message": "Success", "response": deletedProperty });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    };
