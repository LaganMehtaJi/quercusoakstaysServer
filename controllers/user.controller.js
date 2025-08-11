import express from "express";
import * as enqueryModels from "../models/user.controller.js";

export const addUser = async (req, res) => {
  try {
    const {  email, password ,name} = req.body;
    console.log("Received enquiry:",  email, password ,name);
    if ( !email || !password ||!name) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newUser = await enqueryModels.User.create({
      email: email,
      password: password,
      name: name
    });
    res.status(201).json({ "message": "Success", "response": newUser });
  } catch (error) {
    console.error("Error adding enquiry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getUser = async (req, res) => {
  try {
    const users = await enqueryModels.User.find({});
    res.status(200).json({ "message": "Success", "response": users });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const deletedUser = await enqueryModels.User.deleteOne({ email: email });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ "message": "Success", "response": deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const userVerification = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log(email);
    const user = await enqueryModels.User.findOne({  email:email.toLowerCase() });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ "success": "Success", "response": user });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}