import WhatsAppLead from "../models/whatsappLeadModel.js";

// @desc    Create a WhatsApp Lead
// @route   POST /api/whatsapp-leads
// @access  Public
export const createLead = async (req, res) => {
  try {
    const { name, phone, email, message, termsAccepted } = req.body;

    if (!name || !phone || termsAccepted === undefined) {
      return res.status(400).json({ message: "Name, phone, and terms acceptance are required" });
    }

    const lead = await WhatsAppLead.create({
      name,
      phone,
      email,
      message,
      termsAccepted,
      termsAcceptedAt: termsAccepted ? new Date() : null,
    });

    res.status(201).json({ message: "Lead created successfully", data: lead });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all WhatsApp Leads
// @route   GET /api/whatsapp-leads
// @access  Private
export const getLeads = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const leads = await WhatsAppLead.find(query).sort({ createdAt: -1 });
    res.status(200).json({ data: leads });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get WhatsApp Lead Stats
// @route   GET /api/whatsapp-leads/stats
// @access  Private
export const getLeadStats = async (req, res) => {
  try {
    const total = await WhatsAppLead.countDocuments();
    const accepted = await WhatsAppLead.countDocuments({ termsAccepted: true });
    const pending = await WhatsAppLead.countDocuments({ status: "pending" });
    const contacted = await WhatsAppLead.countDocuments({ status: "contacted" });
    const converted = await WhatsAppLead.countDocuments({ status: "converted" });

    res.status(200).json({
      total,
      accepted,
      pending,
      contacted,
      converted,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a WhatsApp Lead status
// @route   PUT /api/whatsapp-leads/:id
// @access  Private
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await WhatsAppLead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead updated passed", data: lead });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a WhatsApp Lead
// @route   DELETE /api/whatsapp-leads/:id
// @access  Private
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await WhatsAppLead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
