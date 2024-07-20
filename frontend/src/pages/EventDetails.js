import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/events/${id}`);
                setEvent(res.data);
            } catch (err) {
                toast.error('Failed to fetch event details');
                console.error('Fetch event error:', err);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRSVP = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:5001/api/events/${id}/rsvp`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEvent(res.data);
            toast.success('RSVP successful');
        } catch (err) {
            toast.error('Failed to RSVP');
            console.error('RSVP error:', err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:5001/api/events/${id}/comment`,
                { text: commentText },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEvent(res.data);
            setCommentText('');
            toast.success('Comment added');
        } catch (err) {
            toast.error('Failed to add comment');
            console.error('Comment error:', err);
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-center my-4 font-bold text-gray-800">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500"><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p className="text-gray-500"><strong>Location:</strong> {event.location}</p>
            <p className="text-gray-500"><strong>Category:</strong> {event.category}</p>
            <button onClick={handleRSVP} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors duration-300">RSVP</button>
            <h3 className="text-2xl my-4 font-semibold text-gray-700">Comments</h3>
            <ul className="space-y-4">
                {event.comments.map(comment => (
                    <li key={comment._id} className="border-b border-gray-300 pb-2">
                        <p className="text-gray-600">{comment.text}</p>
                        <p className="text-gray-500"><small>{new Date(comment.date).toLocaleString()}</small></p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Add a comment..."
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 transition-colors duration-300">Submit</button>
            </form>
        </div>
    );
};

export default EventDetails;
