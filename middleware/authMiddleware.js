const supabase = require("../connection/db");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    // Verify token using Supabase
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    req.user = user.user; // Attach user to request
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
