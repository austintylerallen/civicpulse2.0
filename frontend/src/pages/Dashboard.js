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
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5001/api/events', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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

    const addComment = async (eventId, comment) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:5001/api/events/${eventId}/comment`, { text: comment }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(events.map(event => event._id === eventId ? { ...event, comments: res.data } : event));
        } catch (err) {
            toast.error('Failed to add comment');
        }
    };

    const likeEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:5001/api/events/${eventId}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(events.map(event => event._id === eventId ? { ...event, likes: res.data } : event));
        } catch (err) {
            toast.error('Failed to like event');
        }
    };

    const unlikeEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:5001/api/events/${eventId}/unlike`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(events.map(event => event._id === eventId ? { ...event, likes: res.data } : event));
        } catch (err) {
            toast.error('Failed to unlike event');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Render loading state
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-center my-4 font-bold text-gray-800">Dashboard</h2>
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
                        <div key={event._id} className="p-4 border border-gray-300 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-700">{event.title}</h3>
                            <p className="text-gray-600">{event.description}</p>
                            <p className="text-gray-500"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                            <p className="text-gray-500"><strong>Location:</strong> {event.location}</p>
                            <p className="text-gray-500"><strong>Category:</strong> {event.category}</p>
                            <div className="flex justify-between items-center mt-4">
                                <button onClick={() => likeEvent(event._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-300">Like</button>
                                <button onClick={() => unlikeEvent(event._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300">Unlike</button>
                                <p className="text-gray-700"><strong>Likes:</strong> {event.likes?.length || 0}</p>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700">Comments</h4>
                                {event.comments?.map(comment => (
                                    <div key={comment._id} className="border-t border-gray-200 mt-2 pt-2">
                                        <p className="text-gray-600">{comment.text}</p>
                                        <small className="text-gray-500">{new Date(comment.date).toLocaleString()}</small>
                                    </div>
                                ))}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const comment = e.target.comment.value;
                                    addComment(event._id, comment);
                                    e.target.comment.value = '';
                                }} className="mt-2">
                                    <input type="text" name="comment" placeholder="Add a comment" className="w-full p-2 border border-gray-300 rounded" />
                                    <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-300 mt-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-3">
                        <p className="text-gray-700">No events found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
