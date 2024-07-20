import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            toast.success('Login successful!');
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (err) {
            toast.error(err.response.data.msg || 'Login failed');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl text-center my-4">Login</h2>
            <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
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
