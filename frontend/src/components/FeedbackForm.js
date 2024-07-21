import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeedbackForm = ({ eventId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const submitFeedback = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log(`Submitting feedback for event ID: ${eventId}`);
            await axios.post(`http://localhost:5001/api/events/${eventId}/feedback`, { rating, comment }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Feedback submitted successfully');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error('Failed to submit feedback');
            console.error('Submit feedback error:', err);
        }
    };

    return (
        <form onSubmit={submitFeedback} className="mt-4">
            <div>
                <label>Rating:</label>
                <input 
                    type="number" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    min="1" 
                    max="5"
                    className="p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            <div className="mt-2">
                <label>Comment:</label>
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    className="p-2 border border-gray-300 rounded w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
