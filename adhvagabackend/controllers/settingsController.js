import Settings from "../models/settingsModel.js";

/**
 * GET /api/settings
 * Public
 */
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // If no settings exist → create default automatically
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};


/**
 * PUT /api/settings
 * 🔐 Admin
 */
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // If not exists → create new
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      // Merge incoming data (important for partial updates)
      Object.assign(settings, req.body);
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings
    });

  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to update settings" });
  }
};