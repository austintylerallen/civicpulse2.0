import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        console.log('Sending login data:', userData); // Log sending data
        try {
            const res = await axios.post('http://localhost:5001/api/users/login', userData);
            console.log('Login response:', res.data); // Log response data
            localStorage.setItem('token', res.data.token);
            toast.success('Logged in successfully!');
            navigate('/'); // Use navigate instead of history.push
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err); // Log error
            toast.error(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center my-4">Login</h2>
            <form onSubmit={onSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
