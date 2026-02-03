import Settings from "../models/settingsModels.js";

// Get settings (public - no auth required)
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }
    
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// Update settings (admin only)
export const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    
    // Find existing settings or create new
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(updates);
    } else {
      // Update existing settings
      Object.keys(updates).forEach(key => {
        if (key === 'services' && typeof updates[key] === 'object') {
          settings.services = { ...settings.services, ...updates[key] };
        } else {
          settings[key] = updates[key];
        }
      });
      settings.updatedAt = new Date();
      await settings.save();
    }
    
    res.status(200).json({ message: "Settings updated successfully", data: settings });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
};

// Upload logo
export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No logo file uploaded" });
    }

    const logoPath = req.file.path;
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({ logo: logoPath });
    } else {
      settings.logo = logoPath;
      settings.updatedAt = new Date();
      await settings.save();
    }
    
    res.status(200).json({ message: "Logo uploaded successfully", logo: logoPath });
  } catch (error) {
    console.error("Error uploading logo:", error);
    res.status(500).json({ message: "Failed to upload logo" });
  }
};

// Upload hero banner
export const uploadHeroBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No banner file uploaded" });
    }

    const bannerPath = req.file.path;
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({ heroBanner: bannerPath });
    } else {
      settings.heroBanner = bannerPath;
      settings.updatedAt = new Date();
      await settings.save();
    }
    
    res.status(200).json({ message: "Banner uploaded successfully", banner: bannerPath });
  } catch (error) {
    console.error("Error uploading banner:", error);
    res.status(500).json({ message: "Failed to upload banner" });
  }
};
