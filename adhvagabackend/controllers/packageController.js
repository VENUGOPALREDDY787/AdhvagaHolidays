import Package from "../models/packagesModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};


export const createPackage = async (req, res) => {
  try {
    const {
      title,
      destination,
      price,
      duration,
      rating,
      category,
      tag
    } = req.body;

    // image uploaded by multer
    const imagePath = req.file ? req.file.path : null;
    if (!imagePath) {
      return res.status(400).json({ message: "Image required" });
    }

    // 🔐 bcrypt → hash tag 
    const tagHash = tag ? await bcrypt.hash(tag, 10) : null;

    // 🔑 crypto → generate unique reference id
    const refId = crypto.randomBytes(8).toString("hex");

    const newPackage = await Package.create({
      title,
      destination,
      price,
      duration,
      rating,
      category,
      image: imagePath,
      tagHash,
      refId
    });

    res.status(201).json(newPackage);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create package" });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({
        message: "Package not found"
      });
    }

    res.status(200).json({
      message: "Package deleted successfully",
      data: deletedPackage
    });

  } catch (error) {
    console.error("Delete package error:", error);
    res.status(500).json({
      message: "Failed to delete package"
    });
  }
};


// GET /api/packages/:id
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(pkg);
  } catch (error) {
    console.error("Get package error:", error);
    res.status(500).json({ message: "Invalid package ID" });
  }
};


// PUT /api/packages/:id
export const updatePackage = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    

// 🔥 Parse itinerary JSON
if (updatedData.itinerary) {
  updatedData.itinerary = JSON.parse(updatedData.itinerary);
}
if (
      updatedData.itinerary &&
      !Array.isArray(updatedData.itinerary)
    ) {
      return res.status(400).json({
        message: "Invalid itinerary format",
      });
    }

    // If image updated using multer
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package updated successfully",
      data: updatedPackage
    });

  } catch (error) {
    console.error("Update package error:", error);
    res.status(500).json({ message: "Failed to update package" });
  }
};
