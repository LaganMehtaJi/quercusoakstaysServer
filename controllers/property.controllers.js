import express from "express";
import {Property} from "../models/property.models.js";

export const addProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ message: 'Property added successfully', data: property });
  } catch (error) {
    res.status(400).json({ message: 'Error adding property', error: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ message: 'Properties retrieved successfully', data: properties });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const property = await Property.findByIdAndUpdate(_id, updateData, { new: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json({ message: 'Property updated successfully', data: property });
  } catch (error) {
    res.status(400).json({ message: 'Error updating property', error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { _id } = req.body;
    const property = await Property.findByIdAndDelete(_id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};