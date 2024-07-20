import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const socket = io('http://localhost:5001');
        
        socket.on('connect', () => {
            console.log('connected to server');
        });

        socket.on('notification', (newNotification) => {
            setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5001/api/notifications', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotifications(res.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch notifications');
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(`http://localhost:5001/api/notifications/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(notifications.map((notif) => notif._id === id ? res.data : notif));
        } catch (err) {
            toast.error('Failed to mark notification as read');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-center my-4">Notifications</h2>
            <div className="space-y-2">
                {notifications.map((notif) => (
                    <div key={notif._id} className={`p-2 border ${notif.isRead ? 'border-gray-300' : 'border-blue-500'} rounded`}>
                        <p>{notif.message}</p>
                        {!notif.isRead && (
                            <button
                                onClick={() => markAsRead(notif._id)}
                                className="mt-2 p-2 bg-blue-500 text-white rounded"
                            >
                                Mark as Read
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
