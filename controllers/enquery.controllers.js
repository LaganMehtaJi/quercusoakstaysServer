import express from "express";
import * as enqueryController from "../models/user.controller.js";

export const AddEnqurey = async (req, res) => {
  try {
    const { phone } = req.body;
    console.log("Received phone:", phone);
    if (!phone ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newEnquiry = await enqueryController.Enquiry.create({
    
      phone,

    });
    res.status(201).json({"message":"Success","success":newEnquiry});
  } catch (error) {
    console.error("Error adding enquiry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const GetEnqurey = async (req, res) => {
  try {
    const enquiries = await enqueryController.Enquiry.find({});
    res.status(200).json({"message":"Success","response":enquiries});
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const DeleteEnqurey = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: "Phone no is required" });
    }
    const deletedEnquiry = await enqueryController.Enquiry.deleteOne({phone: phone});
    if (!deletedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    res.status(200).json({"message":"Success","response":deletedEnquiry});
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};