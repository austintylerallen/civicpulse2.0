import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No token found. Please log in.');
                return;
            }

            try {
                console.log('Token:', token); // Log the token
                const res = await axios.get('http://localhost:5001/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
            } catch (err) {
                toast.error('Failed to fetch user profile');
                console.error('Failed to fetch user:', err); // Log error
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center my-4">Profile</h2>
            <div className="p-4 border border-gray-300 rounded">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {/* Add other user details as needed */}
            </div>
        </div>
    );
};

export default Profile;
