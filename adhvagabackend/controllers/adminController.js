import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    /**
     * 👇 Hash the ENV password once and compare
     * (simple approach for small projects)
     */
    const hashedEnvPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const isMatch = await bcrypt.compare(password, hashedEnvPassword);

    if (!isMatch) {
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
