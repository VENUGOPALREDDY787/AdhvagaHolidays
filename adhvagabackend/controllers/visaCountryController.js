import VisaCountry from "../models/visaCountryModel.js";

const normalizePayload = (body) => {
  const payload = {};

  const stringFields = [
    "country",
    "visaType",
    "processingTime",
    "entries",
    "validity",
    "image",
    "description",
  ];

  stringFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = String(body[field] ?? "").trim();
    }
  });

  if (body.sortOrder !== undefined && body.sortOrder !== "") {
    const numericSort = Number(body.sortOrder);
    if (Number.isFinite(numericSort)) {
      payload.sortOrder = numericSort;
    }
  }

  if (body.isActive !== undefined) {
    if (typeof body.isActive === "boolean") {
      payload.isActive = body.isActive;
    } else {
      payload.isActive = String(body.isActive).toLowerCase() === "true";
    }
  }

  if (body.price !== undefined && body.price !== "") {
    const numericPrice = Number(body.price);
    if (Number.isFinite(numericPrice)) {
      payload.price = numericPrice;
    }
  }

  if (body.documentsRequired !== undefined) {
    if (typeof body.documentsRequired === "string") {
      try {
        const parsed = JSON.parse(body.documentsRequired);
        payload.documentsRequired = Array.isArray(parsed) ? parsed : [];
      } catch {
        payload.documentsRequired = body.documentsRequired.split(",").map(i => i.trim()).filter(Boolean);
      }
    } else if (Array.isArray(body.documentsRequired)) {
      payload.documentsRequired = body.documentsRequired.map(i => String(i).trim()).filter(Boolean);
    }
  }

  return payload;
};

export const getAllVisaCountries = async (req, res) => {
  try {
    const isAdminMode = String(req.query.admin || "").toLowerCase() === "true";

    const filter = isAdminMode ? {} : { isActive: true };
    const visas = await VisaCountry.find(filter).sort({ sortOrder: 1, createdAt: -1 });

    res.status(200).json(visas);
  } catch (error) {
    console.error("Get visas error:", error);
    res.status(500).json({ message: "Failed to fetch visa countries" });
  }
};

export const getVisaCountryById = async (req, res) => {
  try {
    const visa = await VisaCountry.findById(req.params.id);
    if (!visa) {
      return res.status(404).json({ message: "Visa country not found" });
    }

    res.status(200).json(visa);
  } catch (error) {
    console.error("Get visa by id error:", error);
    res.status(500).json({ message: "Invalid visa country id" });
  }
};

export const createVisaCountry = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);

    if (!payload.country || !payload.image) {
      return res.status(400).json({ message: "Country and image are required" });
    }

    const created = await VisaCountry.create(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error("Create visa error:", error);
    res.status(500).json({ message: "Failed to create visa country" });
  }
};

export const updateVisaCountry = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const updated = await VisaCountry.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Visa country not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update visa error:", error);
    res.status(500).json({ message: "Failed to update visa country" });
  }
};

export const deleteVisaCountry = async (req, res) => {
  try {
    const deleted = await VisaCountry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Visa country not found" });
    }

    res.status(200).json({ message: "Visa country deleted successfully" });
  } catch (error) {
    console.error("Delete visa error:", error);
    res.status(500).json({ message: "Failed to delete visa country" });
  }
};
