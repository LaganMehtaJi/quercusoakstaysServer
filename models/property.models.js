import mongoose from "mongoose";
const { Schema } = mongoose;

const AddressSchema = new Schema({
  name: { type: String },
  street: { type: String },
  road: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String, default: 'India' },
  zip: { type: String }
}, { _id: false });

const SpaceDetailsSchema = new Schema({
  bedrooms: { type: Number, required: true, min: 0 },
  bathrooms: { type: Number, required: true, min: 0 },
  livingArea: { type: Boolean, default: true },
  diningArea: { type: Boolean, default: true },
  kitchen: {
    chefAvailable: { type: Boolean, default: false },
    description: { type: String }
  },
  driverAccommodation: { type: Boolean, default: false }
}, { _id: false });

const AvailabilitySchema = new Schema({
  checkIn: { type: Date },
  checkOut: { type: Date },
  minNights: { type: Number, default: 1 }
}, { _id: false });

const PropertySchema = new Schema({
  title: { type: String, required: true, trim: true },
  address: AddressSchema,
  location: {
    // Optional GeoJSON point for mapping
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [lng, lat]
      validate: {
        validator: function(v) {
          return !v || (Array.isArray(v) && v.length === 2);
        },
        message: 'Coordinates must be an array of two numbers [lng, lat]'
      }
    }
  },
  propertyHighlights: [{ type: String }],
  spaceDetails: SpaceDetailsSchema,
  amenities: [{ type: String }],
  sqft: { type: Number, min: 0 },
  privateParking: { type: Boolean, default: false },
  infinitePool: { type: Boolean, default: false },
  sunDeck: { type: Boolean, default: false },
  privateTrails: { type: Boolean, default: false },
  gourmetKitchen: { type: Boolean, default: false },
  concierge24x7: { type: Boolean, default: false },
  housekeepingIncluded: { type: Boolean, default: false },

  pricing: {
    pricePerNight: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' }
  },

  booking: {
    guests: { type: Number, default: 1, min: 1 },
    availability: AvailabilitySchema,
    specialRequests: { type: String }
  },

  contactNumber: { type: String },

  meta: {
    source: { type: String },
    historicRoad: { type: String }
  }
}, { timestamps: true });

// Virtual to compute a simple total price for a stay
PropertySchema.virtual('booking.totalPrice').get(function() {
  if (!this.pricing || !this.pricing.pricePerNight || !this.booking || !this.booking.availability) return null;
  const { checkIn, checkOut } = this.booking.availability;
  if (!checkIn || !checkOut) return null;
  const nights = Math.max(0, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
  return nights * this.pricing.pricePerNight;
});

// Index for geo queries if location stored
PropertySchema.index({ 'location': '2dsphere' });

export const Property = mongoose.model('Property', PropertySchema);
