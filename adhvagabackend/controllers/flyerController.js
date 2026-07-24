import Flyer from "../models/flyerModel.js";
import cloudinary from "../config/cloudinary.js";

export const getFlyers = async (req, res) => {
  try {
    const isAdminMode = String(req.query.admin || "").toLowerCase() === "true";
    const filter = isAdminMode ? {} : { active: true };
    const flyers = await Flyer.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    res.status(200).json(flyers);
  } catch (error) {
    console.error("Get flyers error:", error);
    res.status(500).json({ message: "Failed to fetch flyers" });
  }
};

export const createFlyer = async (req, res) => {
  try {
    let { name, url, active, sortOrder } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    if (url.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(url, {
        folder: "flyers",
      });
      url = uploadRes.secure_url;
    }

    const flyer = await Flyer.create({
      name: name || "Untitled Flyer",
      url,
      active: active ?? true,
      sortOrder: Number(sortOrder) || 0,
    });
    res.status(201).json(flyer);
  } catch (error) {
    console.error("Create flyer error:", error);
    res.status(500).json({ message: "Failed to create flyer" });
  }
};

export const updateFlyer = async (req, res) => {
  try {
    let { active, sortOrder, name, url } = req.body;
    const payload = {};
    if (active !== undefined) payload.active = active;
    if (sortOrder !== undefined) payload.sortOrder = Number(sortOrder);
    if (name !== undefined) payload.name = name;

    if (url !== undefined) {
      if (url.startsWith("data:image")) {
        const uploadRes = await cloudinary.uploader.upload(url, {
          folder: "flyers",
        });
        payload.url = uploadRes.secure_url;
      } else {
        payload.url = url;
      }
    }

    const updated = await Flyer.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Flyer not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update flyer error:", error);
    res.status(500).json({ message: "Failed to update flyer" });
  }
};

export const deleteFlyer = async (req, res) => {
  try {
    const deleted = await Flyer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Flyer not found" });
    }
    res.status(200).json({ message: "Flyer deleted successfully" });
  } catch (error) {
    console.error("Delete flyer error:", error);
    res.status(500).json({ message: "Failed to delete flyer" });
  }
};
