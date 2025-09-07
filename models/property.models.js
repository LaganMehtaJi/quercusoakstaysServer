import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    propertyType: {
      type: String,
      required: true,
      enum: [
        "Villa",
        "Apartment",
        "House",
        "Penthouse",
        "Condo",
        "Townhouse",
        "Studio",
        "Mansion",
        "Cottage",
        "Chalet",
      ],
    },

    location: {
      type: String, // ✅ Now just a string, not GeoJSON
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    // Property Details
    spaceDetails: {
      bedrooms: { type: Number, required: true, min: 1, max: 20 },
      bathrooms: { type: Number, required: true, min: 1, max: 20 },
      guests: { type: Number, required: true, min: 1, max: 50 },
      size: { type: String, required: true, trim: true },
      livingArea: { type: Boolean, default: true },
      diningArea: { type: Boolean, default: true },
      kitchen: {
        type: String,
        enum: [
          "Staff only",
          "Guest access",
          "Fully equipped",
          "Basic",
          "None",
        ],
        default: "Staff only",
      },
      driverAccommodation: { type: Boolean, default: false },
    },

    // Amenities & Features
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    // Property Badges
    badges: [
      {
        type: String,
        enum: [
          "Oceanfront",
          "Luxury Collection",
          "Award Winner",
          "New Listing",
          "Pet Friendly",
          "Family Friendly",
          "Romantic Getaway",
          "Business Travel",
        ],
        trim: true,
      },
    ],

    // Images
    images: [
      {
        id: {
          type: String, // Cloudinary public_id or ObjectId
          required: true,
        },
        url: {
          type: String,
          required: true,
          trim: true,
        },
        alt: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],

    // Additional Fields
    specialFeatures: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Property = mongoose.model("Propertyess", propertySchema);
