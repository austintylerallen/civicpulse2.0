import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EventForm from './pages/EventForm';
import EventDetails from './pages/EventDetails';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } />
                    <Route path="/settings" element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    } />
                    <Route path="/create-event" element={
                        <PrivateRoute>
                            <EventForm />
                        </PrivateRoute>
                    } />
                    <Route path="/edit-event/:id" element={
                        <PrivateRoute>
                            <EventForm />
                        </PrivateRoute>
                    } />
                    <Route path="/event/:id" element={
                        <PrivateRoute>
                            <EventDetails />
                        </PrivateRoute>
                    } />
                    {/* Redirect to dashboard if already authenticated */}
                    <Route path="/" element={localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Home />} />
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
