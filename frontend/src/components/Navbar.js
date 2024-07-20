import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">CivicPulse</Link>
                <div className="flex items-center">
                    {isAuthenticated ? (
                        <ProfileDropdown onLogout={handleLogout} />
                    ) : (
                        <>
                            <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            <Link to="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
