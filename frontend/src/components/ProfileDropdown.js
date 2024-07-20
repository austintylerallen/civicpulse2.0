import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const ProfileDropdown = ({ onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleNotifications = async () => {
        setNotificationsOpen(!notificationsOpen);
        if (!notificationsOpen) {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5001/api/notifications', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotifications(res.data);
            } catch (err) {
                console.error('Failed to fetch notifications');
            }
        }
    };

    return (
        <div className="relative flex items-center space-x-4">
            <div className="relative">
                <button onClick={toggleNotifications} className="text-white px-3 py-2 rounded-md text-sm font-medium relative">
                    <FontAwesomeIcon icon={faBell} />
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                </button>
                {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg py-2 z-50">
                        <h3 className="text-gray-800 px-4 py-2">Notifications</h3>
                        <div className="max-h-48 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div key={notif._id} className={`p-2 border-b ${notif.isRead ? 'border-gray-300' : 'border-blue-500'} rounded`}>
                                        <p>{notif.message}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-2 text-gray-500">No new notifications</div>
                            )}
                        </div>
                        <Link to="/notifications" className="block text-center text-blue-500 py-2" onClick={toggleNotifications}>
                            View All
                        </Link>
                    </div>
                )}
            </div>
            <div className="relative">
                <button onClick={toggleDropdown} className="text-white px-3 py-2 rounded-md text-sm font-medium">
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                    />
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            onClick={toggleDropdown}
                        >
                            Profile
                        </Link>
                        <Link
                            to="/settings"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            onClick={toggleDropdown}
                        >
                            Settings
                        </Link>
                        <button
                            onClick={onLogout}
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileDropdown;
