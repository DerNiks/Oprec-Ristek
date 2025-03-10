const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token;
  if (req.headers["authorization"]) {
    const parts = req.headers["authorization"].split(" ");
    if (parts.length > 2) {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
