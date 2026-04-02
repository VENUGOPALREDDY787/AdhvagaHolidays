import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Package from "../models/packagesModels.js";

const parseMaybeJson = (value) => {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  if (!trimmed) return value;

  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
};

const parseStringArray = (value) => {
  const parsed = parseMaybeJson(value);

  if (Array.isArray(parsed)) {
    return parsed
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  }

  if (typeof parsed === "string") {
    return parsed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const parseItinerary = (value) => {
  const parsed = parseMaybeJson(value);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((day, index) => ({
      day: Number(day?.day) || index + 1,
      title: String(day?.title ?? "").trim(),
      description: String(day?.description ?? "").trim(),
    }))
    .filter((day) => day.title || day.description);
};

const buildPackagePayload = (rawBody) => {
  const payload = {};

  const stringFields = [
    "title",
    "location",
    "destination",
    "tag",
    "description",
    "duration",
    "category",
    "type",
  ];

  stringFields.forEach((field) => {
    if (rawBody[field] !== undefined) {
      payload[field] = String(rawBody[field] ?? "").trim();
    }
  });

  const numericFields = ["price", "rating"];
  numericFields.forEach((field) => {
    if (rawBody[field] !== undefined && rawBody[field] !== "") {
      const value = Number(rawBody[field]);
      if (Number.isFinite(value)) {
        payload[field] = value;
      }
    }
  });

  ["highlights", "includes", "excludes"].forEach((field) => {
    if (rawBody[field] !== undefined) {
      payload[field] = parseStringArray(rawBody[field]);
    }
  });

  if (rawBody.itinerary !== undefined) {
    payload.itinerary = parseItinerary(rawBody.itinerary);
  }

  return payload;
};

/* ================= GET ALL PACKAGES ================= */
export const getAllPackages = async (req, res) => {
  try {
    const filters = {};

    if (req.query.type) {
      filters.type = req.query.type;
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    const packages = await Package.find(filters).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

/* ================= CREATE PACKAGE ================= */
export const createPackage = async (req, res) => {
  try {
    const payload = buildPackagePayload(req.body);

    if (!payload.destination || !payload.category || !payload.type) {
      return res.status(400).json({
        message: "Destination, category, and type are required",
      });
    }

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

    const newPackage = await Package.create({
      ...payload,
      image: uploaded.secure_url,
      imageId: uploaded.public_id,
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
    const updatedData = buildPackagePayload(req.body);

    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    // ✅ IMAGE UPDATE
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

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, runValidators: true }
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
