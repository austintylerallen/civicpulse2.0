const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.error('No token, authorization denied');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Decoded user:', req.user); // Log decoded user
        next();
    } catch (err) {
        console.error('Token verification error:', err.message); // Log token verification error
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = { verifyToken };
