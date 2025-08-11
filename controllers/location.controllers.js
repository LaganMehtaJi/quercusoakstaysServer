import express from "express";
import * as enqueryModael from "../models/user.controller.js";
export const addLocation = async (req, res) => {
  try {
    const {  name,tagline,imageUrl} = req.body;
    console.log("Received location:", name, tagline, imageUrl);
    if (!name || !tagline || !imageUrl) {
      return res.status(400).json({ error: "Detail is required" });
    }
    const newLocation = await enqueryModael.Location.create({
      name:name,
       tagline:tagline,
      imageUrl:imageUrl
    });
    res.status(201).json({ "message": "Success", "response": newLocation });
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getLocation = async (req, res) => {

    try {
        const locations = await enqueryModael.Location.find({});
        res.status(200).json({ "message": "Success", "response": locations });
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    };

export const deleteLocation = async (req, res) => {    

    try {
        const { name } = req.body;
        if (!name) {
        return res.status(400).json({ error: "Name is required" });
        }
        const deletedLocation = await enqueryModael.Location.deleteOne({ name: name });
        if (!deletedLocation) {
        return res.status(404).json({ error: "Location not found" });
        }
        res.status(200).json({ "message": "Success", "response": deletedLocation });
    } catch (error) {
        console.error("Error deleting location:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    };