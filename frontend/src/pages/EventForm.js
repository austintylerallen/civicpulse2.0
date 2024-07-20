import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5001/api/events/myevents', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(res.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch events');
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, description, date, location, category };
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5001/api/events', eventData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Event created successfully!');
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setCategory('');
        } catch (err) {
            toast.error('Failed to create event');
        }
    };

    const deleteEvent = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5001/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(events.filter(event => event._id !== id));
            toast.success('Event deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete event');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center my-4">Create Event</h2>
            <form onSubmit={onSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Event</button>
            </form>

            <h2 className="text-3xl text-center my-4">My Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(event => (
                    <div key={event._id} className="p-4 border border-gray-300 rounded">
                        <h3 className="text-xl">{event.title}</h3>
                        <p>{event.description}</p>
                        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Category:</strong> {event.category}</p>
                        <button
                            onClick={() => deleteEvent(event._id)}
                            className="mt-2 p-2 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventForm;
