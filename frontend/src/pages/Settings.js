import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5001/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(res.data.name);
                setEmail(res.data.email);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch user data');
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                'http://localhost:5001/api/users/me',
                { name, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Profile updated successfully!');
        } catch (err) {
            toast.error('Failed to update profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-center my-4">Settings</h2>
            <form onSubmit={updateUser} className="max-w-lg mx-auto space-y-2">
                <div>
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Update Profile</button>
            </form>
        </div>
    );
};

export default Settings;
