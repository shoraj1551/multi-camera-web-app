const jwt = require('jsonwebtoken');

// Middleware to authenticate and authorize users
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
        // Verify the token
        const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable for secret key
        const decoded = jwt.verify(token, secretKey);

        // Attach user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;