import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FeedbackForm from '../components/FeedbackForm';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                console.log(`Fetching event with ID: ${id}`);
                const res = await axios.get(`http://localhost:5001/api/events/${id}`);
                console.log('Event data:', res.data);
                setEvent(res.data);
            } catch (err) {
                toast.error('Failed to fetch event details');
                console.error('Fetch event error:', err);
            }
        };
        fetchEvent();
    }, [id]);

    const deleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`http://localhost:5001/api/events/${id}/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvent({ ...event, comments: res.data });
            toast.success('Comment deleted successfully');
        } catch (err) {
            toast.error('Failed to delete comment');
            console.error('Delete comment error:', err);
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center my-4">{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <h3 className="text-2xl my-4">Comments</h3>
            <ul>
                {event.comments.map(comment => (
                    <li key={comment._id} className="border-b border-gray-300 py-2">
                        <p>{comment.text}</p>
                        <p><small>{new Date(comment.date).toLocaleString()}</small></p>
                        <button 
                            onClick={() => deleteComment(comment._id)} 
                            className="bg-red-500 text-white p-1 rounded mt-2"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventDetails;
