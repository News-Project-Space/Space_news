// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {

//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  // Check for token in cookies or Authorization header


//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret key
//     req.user = decoded;  // Attach the user info to the request object
//     next();  // Allow the request to continue to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const User = require('../Models/userModel'); // استيراد النموذج من ملف userModel.js

// Middleware للتحقق من التوكن
const authMiddleware = (req, res, next) => {
  // التحقق من وجود التوكن في الكوكيز أو رأس Authorization
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // إذا لم يتم توفير التوكن
  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret key
    req.user = decoded;  // Attach the user info to the request object
    next();  // Allow the request to continue to the next middleware or route handler
  } catch (error) {
    // إذا كان التوكن غير صالح
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    // لأي أخطاء أخرى
    return res.status(401).json({ message: "Authorization failed", error: error.message });
  }
};

module.exports = authMiddleware;
