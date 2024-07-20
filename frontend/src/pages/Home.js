import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold my-4">Welcome to CivicPulse</h1>
            <p className="text-lg mb-4">
                CivicPulse is your gateway to staying informed and engaged with your local community. 
                Get real-time updates on local government activities, public meetings, and community initiatives.
            </p>
            <div className="flex justify-center space-x-4">
                <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Register</Link>
            </div>
        </div>
    );
};

export default Home;
