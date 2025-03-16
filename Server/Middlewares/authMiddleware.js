const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    if (!decoded._id || !decoded.role) {
      return res.status(401).json({ message: "Invalid token structure" });
    }

    req.user = decoded;  

    console.log("Authenticated User:", req.user); 

    next();  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret key
    req.user = decoded;  // Attach the user info to the request object
    next();  // Allow the request to continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
