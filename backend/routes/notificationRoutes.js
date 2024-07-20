const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Ensure this path is correct
const Notification = require('../models/Notification');

// Get notifications for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications:', err); // Enhanced logging
        res.status(500).send('Server error');
    }
});

// Mark a notification as read
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        notification.isRead = true;
        await notification.save();
        res.json(notification);
    } catch (err) {
        console.error('Error marking notification as read:', err); // Enhanced logging
        res.status(500).send('Server error');
    }
});

module.exports = router;
