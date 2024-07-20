import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/events');
                setEvents(res.data);
                setFilteredEvents(res.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch events');
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const filtered = events.filter(event => {
            return (
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (category === '' || event.category === category)
            );
        });
        setFilteredEvents(filtered);
    }, [searchTerm, category, events]);

    if (loading) {
        return <div>Loading...</div>; // Render loading state
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center my-4">Dashboard</h2>
            <div className="mb-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-1/3"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-1/3"
                >
                    <option value="">All Categories</option>
                    <option value="Government">Government</option>
                    <option value="Community">Community</option>
                    <option value="Sports">Sports</option>
                    {/* Add other categories as needed */}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div key={event._id} className="p-4 border border-gray-300 rounded">
                            <h3 className="text-xl">{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Category:</strong> {event.category}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-3">
                        <p>No events found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
