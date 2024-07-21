const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    rsvpEvent,
    addComment,
    likeEvent,
    unlikeEvent,
    addFeedback,
    deleteComment
} = require('../controllers/eventController');

// Get all events
router.get('/', verifyToken, getEvents);

// Create new event
router.post('/', verifyToken, createEvent);

// Get event by ID
router.get('/:id', verifyToken, getEventById);

// Update event by ID
router.put('/:id', verifyToken, updateEvent);

// Delete event by ID
router.delete('/:id', verifyToken, deleteEvent);

// RSVP to event
router.post('/:id/rsvp', verifyToken, rsvpEvent);

// Add comment to event
router.post('/:id/comment', verifyToken, addComment);

// Like event
router.post('/:id/like', verifyToken, likeEvent);

// Unlike event
router.post('/:id/unlike', verifyToken, unlikeEvent);

// Add feedback to event
router.post('/:id/feedback', verifyToken, addFeedback);

// Delete comment
router.delete('/:id/comment/:commentId', verifyToken, deleteComment);


module.exports = router;
