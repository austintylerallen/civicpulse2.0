const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
    try {
        const newEvent = new Event({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        });
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error('Server error:', err.message, err.stack); // Enhanced logging
        res.status(500).send('Server error');
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.id }).sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error('Server error:', err.message, err.stack); // Enhanced logging
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
        console.error('Server error:', err.message, err.stack); // Enhanced logging
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
        await event.save();
        res.json(event);
    } catch (err) {
        console.error('Server error:', err.message, err.stack); // Enhanced logging
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
        console.error('Server error:', err.message, err.stack); // Enhanced logging
        res.status(500).send('Server error');
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
