import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
                <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                    <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
