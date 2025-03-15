const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  // Check for token in cookies or Authorization header


  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret key
    req.user = decoded;  // Attach the user info to the request object
    next();  // Allow the request to continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
