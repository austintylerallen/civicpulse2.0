import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/events/${id}`);
                setEvent(res.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch event details');
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            {event ? (
                <div>
                    <h2 className="text-3xl text-center my-4">{event.title}</h2>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Category:</strong> {event.category}</p>
                </div>
            ) : (
                <p>Event not found</p>
            )}
        </div>
    );
};

export default EventDetails;
