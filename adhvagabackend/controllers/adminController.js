import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ FIX: Direct password comparison (no bcrypt here)
    if (password !== process.env.ADMIN_PASSWORD) {
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