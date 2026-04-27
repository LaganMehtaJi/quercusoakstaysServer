import  Offer  from "../models/Offer.models.js";
// ===============================
// Create Offer
// ===============================
export const createOffer = async (req, res) => {
  try {
    const {
      code,
      title,
      description,
      discountPercentage,
      minimumOrderAmount,
      maxDiscountAmount,
      usageLimit,
      expiryDate,
    } = req.body;

    if (!code || !title || !description || !discountPercentage || !expiryDate) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if offer already exists
    const existingOffer = await Offer.findOne({ code: code.toUpperCase() });
    if (existingOffer) {
      return res.status(400).json({ message: "Offer code already exists" });
    }

    const newOffer = new Offer({
      code: code.toUpperCase(),
      title,
      description,
      discountPercentage,
      minimumOrderAmount,
      maxDiscountAmount,
      usageLimit,
      expiryDate,
    });

    await newOffer.save();

    res.status(201).json({
      message: "Offer created successfully",
      offer: newOffer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Get All Offers
// ===============================
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}).sort({ createdAt: -1 });

    res.status(200).json({ offers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Get Offer By Code
// ===============================
export const getOfferByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const offer = await Offer.findOne({ code: code.toUpperCase() });

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({ offer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Update Offer
// ===============================
export const updateOffer = async (req, res) => {
  try {
    const { code } = req.params;

    const offer = await Offer.findOne({ code: code.toUpperCase() });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    const updatedOffer = await Offer.findOneAndUpdate(
      { code: code.toUpperCase() },
      { ...req.body },
      { new: true }
    );

    res.status(200).json({
      message: "Offer updated successfully",
      offer: updatedOffer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Delete Offer
// ===============================
export const deleteOffer = async (req, res) => {
  try {
    const { code } = req.params;

    const offer = await Offer.findOne({ code: code.toUpperCase() });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// Validate Offer (Coupon)
// ===============================
export const validateOffer = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const offer = await Offer.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      expiryDate: { $gt: new Date() }
    });

    if (!offer) {
      return res.status(404).json({ message: "Invalid or expired coupon code" });
    }

    if (offer.usedCount >= offer.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    if (orderAmount < offer.minimumOrderAmount) {
      return res.status(400).json({ 
        message: `Minimum order amount of ₹${offer.minimumOrderAmount} required for this coupon` 
      });
    }

    res.status(200).json({
      message: "Coupon applied successfully ✅",
      offer: {
        code: offer.code,
        discountPercentage: offer.discountPercentage,
        maxDiscountAmount: offer.maxDiscountAmount
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
