import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');
            try {
                console.log('Fetching events...');
                const res = await axios.get('http://localhost:5001/api/events', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Events fetched:', res.data);
                setEvents(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching events:', err);
                toast.error('Failed to fetch events');
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render loading state
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center my-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length > 0 ? (
                    events.map(event => (
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
