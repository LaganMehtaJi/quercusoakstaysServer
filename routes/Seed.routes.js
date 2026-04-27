import express from "express";
import Product from "../models/Product.models.js";

const router = express.Router();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation",
    category: "Electronics",
    brand: "Sonic",
    sku: "ELEC-001",
    price: 89.99,
    stock: 25,
    rating: 4.5,
    numReviews: 120,
    isFeatured: true,
    images: [{ id: "1", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Wireless Headphones" }],
    tags: ["wireless", "audio", "premium"]
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health monitoring",
    category: "Electronics",
    brand: "TechTime",
    sku: "ELEC-002",
    price: 249.99,
    stock: 15,
    rating: 4.7,
    numReviews: 85,
    isFeatured: true,
    images: [{ id: "2", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Smart Watch Pro" }],
    tags: ["smart", "fitness", "tech"]
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "100% organic cotton eco-friendly t-shirt",
    category: "Fashion",
    brand: "EcoStyle",
    sku: "FASH-001",
    price: 29.99,
    stock: 50,
    rating: 4.3,
    numReviews: 45,
    isFeatured: false,
    images: [{ id: "3", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Organic Cotton T-Shirt" }],
    tags: ["organic", "cotton", "sustainable"]
  },
  {
    name: "Modern Desk Lamp",
    description: "Adjustable modern LED desk lamp",
    category: "Home",
    brand: "Lumina",
    sku: "HOME-001",
    price: 45.50,
    stock: 30,
    rating: 4.6,
    numReviews: 60,
    isFeatured: true,
    images: [{ id: "4", url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Modern Desk Lamp" }],
    tags: ["home", "lighting", "modern"]
  },
  {
    name: "Yoga Mat Premium",
    description: "Eco-friendly non-slip yoga mat",
    category: "Sports",
    brand: "Flex",
    sku: "SPOR-001",
    price: 34.99,
    stock: 40,
    rating: 4.4,
    numReviews: 110,
    isFeatured: false,
    images: [{ id: "5", url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", alt: "Yoga Mat Premium" }],
    tags: ["fitness", "yoga", "eco"]
  },
  {
    name: "Paper Cups - Pack of 50",
    description: "Eco-friendly biodegradable paper cups",
    category: "Paper Cups",
    brand: "GreeneGo",
    sku: "PAPR-001",
    price: 199,
    stock: 100,
    rating: 4.8,
    numReviews: 200,
    isFeatured: true,
    images: [{ id: "6", url: "https://res.cloudinary.com/dbeqhfbpk/image/upload/v1774203354/Gemini_Generated_Image_5aulz05aulz05aul_kheetb.png", alt: "Paper Cups" }],
    tags: ["eco", "paper", "cups"]
  }
];

router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(sampleProducts);
    res.json({ message: "Seeded products successfully", products: createdProducts });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

export default router;
