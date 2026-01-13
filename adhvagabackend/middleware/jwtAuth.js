import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next(); // allow admin
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
