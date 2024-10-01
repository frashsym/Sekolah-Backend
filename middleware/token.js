import jwt from "jsonwebtoken";

// Middleware untuk memverifikasi token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Token tidak tersedia' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Format token tidak valid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token telah kedaluwarsa' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token tidak valid' });
        } else {
            return res.status(500).json({ message: 'Kesalahan server' });
        }
    }
};

export default verifyToken;