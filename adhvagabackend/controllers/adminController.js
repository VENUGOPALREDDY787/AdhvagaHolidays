import jwt from "jsonwebtoken";
import crypto from "crypto";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Secure timing-safe password comparison
    const envPasswordBuffer = Buffer.from(process.env.ADMIN_PASSWORD || "");
    const inputPasswordBuffer = Buffer.from(password || "");

    if (
      envPasswordBuffer.length !== inputPasswordBuffer.length ||
      !crypto.timingSafeEqual(envPasswordBuffer, inputPasswordBuffer)
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Admin login successful",
      token
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};