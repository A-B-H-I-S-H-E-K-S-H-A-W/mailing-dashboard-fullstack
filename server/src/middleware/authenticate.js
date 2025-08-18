import jwt from "jsonwebtoken";

export function authenticate() {
  return async function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
}
