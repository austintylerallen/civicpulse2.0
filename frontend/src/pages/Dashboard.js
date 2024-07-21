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

    const deleteComment = async (eventId, commentId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`http://localhost:5001/api/events/${eventId}/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(events.map(event => event._id === eventId ? { ...event, comments: res.data } : event));
            toast.success('Comment deleted');
        } catch (err) {
            toast.error('Failed to delete comment');
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

    const rsvpEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:5001/api/events/${eventId}/rsvp`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(events.map(event => event._id === eventId ? { ...event, attendees: res.data } : event));
        } catch (err) {
            toast.error('Failed to RSVP');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Render loading state
    }

    return (
        <div className="container mx-auto p-4">
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
                            <button 
                                onClick={() => likeEvent(event._id)} 
                                className="bg-blue-500 text-white p-2 rounded mr-2 mt-2"
                            >
                                Like
                            </button>
                            <button 
                                onClick={() => unlikeEvent(event._id)} 
                                className="bg-gray-500 text-white p-2 rounded mr-2 mt-2"
                            >
                                Unlike
                            </button>
                            <button 
                                onClick={() => rsvpEvent(event._id)} 
                                className="bg-green-500 text-white p-2 rounded mt-2"
                            >
                                RSVP
                            </button>
                            <p><strong>Likes:</strong> {event.likes?.length || 0}</p>
                            <p><strong>Attendees:</strong> {event.attendees?.length || 0}</p>
                            <div>
                                <h4>Comments</h4>
                                {event.comments?.map(comment => (
                                    <div key={comment._id} className="border-b border-gray-300 py-2">
                                        <p>{comment.text}</p>
                                        <small>{new Date(comment.date).toLocaleString()}</small>
                                        <button 
                                            onClick={() => deleteComment(event._id, comment._id)} 
                                            className="bg-red-500 text-white p-2 rounded ml-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const comment = e.target.comment.value;
                                    addComment(event._id, comment);
                                    e.target.comment.value = '';
                                }} className="mt-2">
                                    <input 
                                        type="text" 
                                        name="comment" 
                                        placeholder="Add a comment" 
                                        className="p-2 border border-gray-300 rounded w-full"
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-blue-500 text-white p-2 rounded mt-2"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
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
