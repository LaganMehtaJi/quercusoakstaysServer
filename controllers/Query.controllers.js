import Query  from "../models/Query.models.js";


// ==========================================
// ➕ Create Query
// ==========================================
export const createQuery = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message, relatedProduct } =
      req.body;

    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newQuery = new Query({
      fullName,
      email,
      phone,
      subject,
      message,
      relatedProduct,
    });

    await newQuery.save();

    res.status(201).json({
      message: "Query submitted successfully ✅",
      query: newQuery,
    });
  } catch (error) {
    console.error("Create Query Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// 📂 Get All Queries (Admin)
// ==========================================
export const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find()
      .populate("relatedProduct", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ queries });
  } catch (error) {
    console.error("Get Queries Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// 🔍 Get Query By ID
// ==========================================
export const getQueryById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = await Query.findById(id).populate(
      "relatedProduct",
      "name"
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ query });
  } catch (error) {
    console.error("Get Query Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// ✏️ Update Query Status (Admin)
// ==========================================
export const updateQueryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const query = await Query.findById(id);

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    query.status = status;
    await query.save();

    res.status(200).json({
      message: "Query status updated successfully ✅",
      query,
    });
  } catch (error) {
    console.error("Update Query Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ==========================================
// ❌ Delete Query
// ==========================================
export const deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const query = await Query.findById(id);

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    await Query.findByIdAndDelete(id);

    res.status(200).json({ message: "Query deleted successfully ✅" });
  } catch (error) {
    console.error("Delete Query Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
