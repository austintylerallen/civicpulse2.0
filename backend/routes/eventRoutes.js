const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Ensure this path is correct
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController'); // Ensure these are properly exported

// Create a new event
router.post('/', verifyToken, createEvent);

// Get all events
router.get('/', verifyToken, getEvents);

// Get event by ID
router.get('/:id', verifyToken, getEventById);

// Update event by ID
router.put('/:id', verifyToken, updateEvent);

// Delete event by ID
router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;
