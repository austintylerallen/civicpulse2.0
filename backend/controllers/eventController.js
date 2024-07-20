const Event = require('../models/Event');
const User = require('../models/User');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const newEvent = new Event({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            category: req.body.category
        });
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// Update event by ID
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        event.category = req.body.category || event.category;
        await event.save();
        res.json(event);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// Delete event by ID
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        await event.remove();
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// RSVP to event
const rsvpEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        if (event.attendees.includes(req.user.id)) {
            return res.status(400).json({ msg: 'User already RSVPed' });
        }
        event.attendees.push(req.user.id);
        await event.save();
        res.json(event);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// Add comment to event
const addComment = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            date: Date.now()
        };
        event.comments.unshift(newComment);
        await event.save();
        res.json(event.comments);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// Like event
const likeEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        if (event.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'User already liked this event' });
        }
        event.likes.unshift({ user: req.user.id });
        await event.save();
        res.json(event.likes);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

// Unlike event
const unlikeEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        if (!event.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'User has not liked this event' });
        }
        event.likes = event.likes.filter(like => like.user.toString() !== req.user.id);
        await event.save();
        res.json(event.likes);
    } catch (err) {
        console.error('Server error:', err.message, err.stack);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    rsvpEvent,
    addComment,
    likeEvent,
    unlikeEvent
};
