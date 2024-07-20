const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('../models/Event'); // Ensure this path is correct

dotenv.config();

const events = [
    {
        title: 'City Hall Meeting',
        description: 'Monthly meeting to discuss city issues.',
        date: new Date('2024-07-20T10:00:00'),
        location: 'City Hall',
        category: 'Government'
    },
    {
        title: 'Community Clean-Up',
        description: 'Join us for a community clean-up event.',
        date: new Date('2024-07-21T08:00:00'),
        location: 'Central Park',
        category: 'Community'
    },
    // Add more events as needed
];

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await Event.deleteMany(); // Clear existing events
        await Event.insertMany(events); // Seed new events

        console.log('Events seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding events:', err);
    }
};

seedEvents();
