import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Package from "../models/packagesModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

/* ================= GET ALL PACKAGES ================= */
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

/* ================= CREATE PACKAGE ================= */
export const createPackage = async (req, res) => {
  try {
    const {
      title,
      destination,
      price,
      duration,
      rating,
      category,
      tag,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // ⬆️ Upload to Cloudinary
    const uploadImage = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "adhvaga-packages" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const uploaded = await uploadImage();

    const tagHash = tag ? await bcrypt.hash(tag, 10) : null;
    const refId = crypto.randomBytes(8).toString("hex");

    const newPackage = await Package.create({
      title,
      destination,
      price,
      duration,
      rating,
      category,
      image: uploaded.secure_url,
      imageId: uploaded.public_id,
      tagHash,
      refId,
    });

    res.status(201).json(newPackage);
  } catch (error) {
    console.error("Create package error:", error);
    res.status(500).json({ message: "Failed to create package" });
  }
};

/* ================= DELETE PACKAGE ================= */
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (pkg.imageId) {
      await cloudinary.uploader.destroy(pkg.imageId);
    }

    await pkg.deleteOne();

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Delete package error:", error);
    res.status(500).json({ message: "Failed to delete package" });
  }
};

/* ================= GET PACKAGE BY ID ================= */
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

/* ================= UPDATE PACKAGE ================= */
export const updatePackage = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    if (updatedData.itinerary) {
      updatedData.itinerary = JSON.parse(updatedData.itinerary);
    }

    if (
      updatedData.itinerary &&
      !Array.isArray(updatedData.itinerary)
    ) {
      return res.status(400).json({ message: "Invalid itinerary format" });
    }

    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    // 🔄 Replace image in Cloudinary
    if (req.file) {
      if (pkg.imageId) {
        await cloudinary.uploader.destroy(pkg.imageId);
      }

      const uploadImage = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "adhvaga-packages" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const uploaded = await uploadImage();

      updatedData.image = uploaded.secure_url;
      updatedData.imageId = uploaded.public_id;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Package updated successfully",
      data: updatedPackage,
    });
  } catch (error) {
    console.error("Update package error:", error);
    res.status(500).json({ message: "Failed to update package" });
  }
};
