import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="text-white px-3 py-2 rounded-md text-sm font-medium">
                <img
                    src="/profile.jpg" // Path to your default profile picture
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                    <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
